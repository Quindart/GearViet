import mongoose from 'mongoose';
import moment from 'moment';

import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

import { tokenDecode } from '../middlewares/tokenHandler.js';
import {
  sendWarning,
  sendError,
  sendConflict,
  sendNotFound,
} from '../utils/response.js';
import { HTTP_STATUS, ROLE } from '../utils/constant.js';



//[GET] /getAllOrder
export const getAllOrder = async (req, res) => {
  const { page, limit } = Object.assign({}, req.query);
  try {
    const orders = await Order.find()
      .populate("products.product")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();

    const totalRows = await Order.countDocuments();

    if (orders) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        totalRows,
        orders,
      });
    } else {
      sendWarning(res, "Get all order failed");
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /getOrderById
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("products.product");
    if (
      req.user.role === ROLE.OWNER ||
      req.user.role === ROLE.ADMIN ||
      req.user.role === ROLE.MOD ||
      req.user._id.toString() === order.user.toString()
    ) {
      if (order) {
        res.status(HTTP_STATUS.SUCCESS).json({
          success: true,
          status: 200,
          order,
        });
      } else {
        sendWarning(res, "Order not found!");
      }
    } else return sendWarning(res, "You can't access this resource");
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /getTotalOrderByTime
export const getTotalOrderByTime = async (req, res) => {
  const { limit } = Object.assign({}, req.query);
  try {
    let query = {
      createdAt: {
        $lte: moment().toDate(),
        $gte: moment().subtract(1, limit).toDate(),
      },
    };
    const total = await Order.find(query).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      total,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /getTotalRevenue
export const getTotalRevenue = async (req, res) => {
  const { limit } = Object.assign({}, req.query);
  try {
    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: moment().toDate(),
            $gte: moment().subtract(1, limit).toDate(),
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$product.price"],
            },
          },
        },
      },
    ]);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /getTotalRevenueByProductId
export const getTotalRevenueId = async (req, res) => {
  const { productId } = Object.assign({}, req.params);
  try {
    const check = await Product.findById(productId);

    if (!check) return sendNotFound(res, "productId not found!");

    const result = await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.product": new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$products.currentPrice"],
            },
          },
        },
      },
    ]);

    console.log(result);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /getOrderByUserId
export const getOrderByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    if (
      req.user.role === ROLE.OWNER ||
      req.user.role === ROLE.ADMIN ||
      req.user.role === ROLE.MOD ||
      req.user._id.toString() === userId
    ) {
      const orders = await Order.find({ user: userId })
        .populate("products.product")
        .populate("user", "username email phone")
        .lean();

      if (!orders) return sendWarning(res, "Get orders failed!");

      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        orders,
      });
    } else return sendWarning(res, "You can't access this resource");
  } catch (error) {
    sendError(res, error);
  }
};

//[POST] /createOrder
export const createOrder = async (req, res) => {
  let userId;
  const { products, customerInfo, paymentType } =
    req.body;

  //Nếu người dùng đăng nhập thì lấy userId
  const tokenDecoded = await tokenDecode(req);
  if (tokenDecoded) {
    userId = tokenDecoded.id;
  }

  try {
    if (paymentType === "offline") {
      const newOrder = await createOrderController(
        products,
        customerInfo,
        "offline",
        "unpaid",
        userId
      );

      increaseProductSold(products);

      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        newOrder,
      });
    } else {
      // Online payment
      const newOrder = await createOrderController(
        products,
        customerInfo,
        "online",
        "unpaid",
        userId
      );

      increaseProductSold(products);

      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        newOrder,
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /searchOrder
export const searchOrder = async (req, res) => {
  const { name, code, phone, page, limit } = Object.assign({}, req.query);
  const { user } = req;

  var regex = {
    "customerInfo.fullname": {
      $regex: name ? name : "",
      $options: "i",
    },
    code: {
      $regex: code ? code : "",
      $options: "i",
    },
    "customerInfo.phone": {
      $regex: phone ? phone : "",
      $options: "i",
    },
  };

  if (user.role === ROLE.USER) {
    regex["user"] = user._id;
  }

  try {
    const orders = await Order.find(regex)
      .populate("products.product")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Order.find(regex).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      orders,
    });
  } catch (error) {
    sendError(res, error);
  }
};

export const changeOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = Object.assign({}, req.body);
  try {
    //Check Order exist
    const currentOrder = await Order.findById(orderId);
    if (currentOrder.length === 0)
      return sendWarning(res, "Order is not exist");
    if (status === "pendding")
      return sendWarning(res, "cannot be changed to pending!");
    if (status === "completed" && currentOrder.status === "completed")
      return sendConflict(res, "status already exists!");
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );
    if (!updatedOrder) return sendWarning(res, "Update Order status failed");

    //tăng selling của product khi status -> completed
    if (status === "completed") {
      currentOrder.products.forEach(async (element) => {
        const { product, quantity } = element;
        await Product.findByIdAndUpdate(product, {
          $inc: {
            selling: quantity,
          },
        });
      });
    }
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      OrderStatus: updatedOrder.status,
    });
  } catch (error) {
    sendError(res, error);
  }
};


export const filterOrder = async (req, res) => {
  const {
    page,
    limit,
    status,
    paymentStatus,
    paymentType,
    code,
  } = Object.assign({}, req.query);

  var query = {};
  if (status !== undefined) query["status"] = status;
  if (paymentStatus !== undefined) query["paymentStatus"] = paymentStatus;
  if (paymentType !== undefined) query["paymentType"] = paymentType;
  if (code !== undefined && code !== "")
    query["code"] = {
      $regex: code ? code : "",
      $options: "i",
    };

  try {
    const orders = await Order.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Order.find(query).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      orders,
    });
  } catch (error) {
    sendError(res, error);
  }
};


export const toggleProductQuantity = async (products, type) => {
  products.forEach(async (element) => {
    const { product, quantity } = element;
    const updateProduct = await Product.findByIdAndUpdate(product, {
      $inc: {
        available: type === "decrease" ? -quantity : quantity,
      },
    });
  });
};

export const increaseProductSold = async (products) => {
  for (const item of products) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        selling: item.quantity,
      },
    });
  }
};

export const createOrderController = async (
  products,
  customerInfo,
  paymentType,
  paymentStatus,
  userId,
  transactionNo,
  payDate
) => {
  let { fullname, address, phone, email } = customerInfo;

  for (let i = 0; i < products.length; i++) {
    const { product, quantity } = products[i];
    const productAvailable = await Product.findById(product).select(
      "available price"
    );

    if (quantity > productAvailable.available) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "Product quantity exceeds available!",
        product: products[i],
      });
    }
    products[i]["currentPrice"] = productAvailable.price;
  }

  const data = {};
  data["products"] = products;
  data["customerInfo"] = {
    fullname,
    address,
    phone,
    email,
  };
  data["paymentType"] = paymentType;
  data["paymentStatus"] = paymentStatus;

  if (userId) data["user"] = userId;
  if (transactionNo) data["transactionNo"] = transactionNo;
  if (payDate) data["payDate"] = payDate;

  // trừ số lượng sản phẩm từ Product
  toggleProductQuantity(products, "decrease");

  const newOrder = await Order.create(data);

  if (!newOrder) {
    //nếu tạo mới k thành công thì trả lại số lượng về sp
    toggleProductQuantity(products, "increase");
  }

  return newOrder;
};
