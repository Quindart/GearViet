import mongoose from 'mongoose';
import moment from 'moment';

import Order from '../models/order.model.js';
import Coupon from '../models/coupon.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL;

import { tokenDecode } from '../middlewares/tokenHandler.js';
import {
  sendWarning,
  sendError,
  sendConflict,
  sendNotFound,
} from '../utils/response.js';
import { HTTP_STATUS, ROLE, ORDER_STATUS } from '../utils/constant.js';

import { checkCode } from './coupon.controller.js';

import {
  cacheData,
} from '../utils/cache.js';


import axios from 'axios';

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
      .populate("products.product")
      .populate("coupon", "discount");
    if (
      req.user.role === ROLE.OWNER ||
      req.user.role === ROLE.ADMIN ||
      req.user.role === ROLE.MOD ||
      req.user.role === ROLE.WAREHOUSE ||
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
    const total = await Order.find(query).count();

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
      totalRevenue: result[0].totalRevenue,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /getTotalRevenueByProductId
export const getTotalRevenueId = async (req, res) => {
  const { productId } = Object.assign({}, req.params);
  try {
    const check = Product.findById(productId);

    if (!check) return sendNotFound(res, "productId not found!");

    const result = await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $match: {
          "products.product": mongoose.Types.ObjectId(productId),
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
  const { products, coupon, shippingDetail, paymentType, serviceTypeId } =
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
        coupon,
        shippingDetail,
        serviceTypeId,
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
      const key = Date.now();

      //Luu du lieu vao cache vs time out la 5p
      cacheData(
        key.toString(),
        JSON.stringify({
          products,
          coupon,
          shippingDetail,
          serviceTypeId,
          userId,
        })
      );

      //Tinh tong tien hang
      let subTotal = 0;
      let total;
      for (const item of products) {
        const product = await Product.findOne({ _id: item.product }).exec();

        if (!product) {
          console.log(`Không tìm thấy sản phẩm với id: ${item.productId}`);
          continue;
        }

        subTotal += product.price * item.quantity;
      }

      if (coupon) {
        const currentCoupon = await Coupon.findOne({ code: coupon });
        total = subTotal - (subTotal * parseInt(currentCoupon.discount)) / 100;
      } else {
        total = subTotal;
      }

      const response = await axios.post(
        `${BASE_URL}:${PORT}/payment/create_payment_url`,
        {
          amount: total,
          orderDescription: `ecomx_${key}`,
        }
      );

      res.status(HTTP_STATUS.SUCCESS).json(response.data);
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
    "shippingDetail.fullname": {
      $regex: name ? name : "",
      $options: "i",
    },
    code: {
      $regex: code ? code : "",
      $options: "i",
    },
    "shippingDetail.phone": {
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
    const totalRows = await Order.find(regex).count();

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

//Asign order to warehouse user
export const assignOrderToWarehouse = async (req, res) => {
  const { warehouseUserId, orderId } = req.body;

  try {
    const currentOrder = await Order.findById(orderId);
    if (!currentOrder) return sendWarning(res, "Order not found");

    //khi status cua order la shipping, returning ....thi khong cho assign
    if (currentOrder.status !== ORDER_STATUS.PENDING)
      return sendWarning(res, "You cant assign order to warehouse right now");

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          warehouseUser: warehouseUserId,
          status: ORDER_STATUS.ASSIGNED,
        },
      },
      { new: true }
    );

    if (!updatedOrder) return sendWarning(res, "Assign warehouse user failed");

    //tăng selling của product khi status -> completed
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      order: updatedOrder,
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
    warehouseUser,
    code,
  } = Object.assign({}, req.query);

  var query = {};
  if (status !== undefined) query["status"] = status;
  if (paymentStatus !== undefined) query["paymentStatus"] = paymentStatus;
  if (paymentType !== undefined) query["paymentType"] = paymentType;
  if (warehouseUser !== undefined) query["warehouseUser"] = warehouseUser;
  if (code !== undefined && code !== "")
    query["code"] = {
      $regex: code ? code : "",
      $options: "i",
    };

  try {
    const orders = await Order.find(query)
      .populate("warehouseUser", "_id username")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Order.find(query).count();

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

export const toggleCouponQuantity = async (code, quantity) => {
  const coupon = await Coupon.findOneAndUpdate(
    { code: code },
    {
      $inc: {
        available: quantity,
      },
    }
  );
  return coupon;
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
  coupon,
  shippingDetail,
  serviceTypeId,
  paymentType,
  paymentStatus,
  userId,
  transactionNo,
  payDate
) => {
  let { fullname, address, phone, email } = shippingDetail;

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
  data["shippingDetail"] = {
    fullname,
    address,
    phone,
    email,
  };
  data["serviceTypeId"] = serviceTypeId;
  data["paymentType"] = paymentType;
  data["paymentStatus"] = paymentStatus;

  if (userId) data["user"] = userId;
  if (transactionNo) data["transactionNo"] = transactionNo;
  if (payDate) data["payDate"] = payDate;

  // nếu có coupon thì check có hợp lệ k
  if (coupon) {
    const result = await checkCode(coupon);
    //Neu hop le thi tru so luong
    if (typeof result !== "string") {
      const currentCoupon = await toggleCouponQuantity(coupon, -1);

      //Them coupon vao data
      data["coupon"] = currentCoupon._id;
    } else return sendWarning(res, "coupon k hop le");
  }

  // trừ số lượng sản phẩm từ Product
  toggleProductQuantity(products, "decrease");

  const newOrder = await Order.create(data);

  if (!newOrder) {
    //nếu tạo mới k thành công thì trả lại số lượng về sp
    toggleProductQuantity(products, "increase");

    //nếu tạo mới k thành công va co coupon thì trả lại số lượng coupon
    //Da check tinh hop le cua coupon o tren nen k check nua
    toggleCouponQuantity(coupon, 1);
  }

  return newOrder;
};
