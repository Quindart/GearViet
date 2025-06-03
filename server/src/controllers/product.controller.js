import User from "../models/user.model.js";
import moment from "moment";
import {
  sendWarning,
  sendError,
  sendConflict,
  sendNotFound,
} from "../utils/response.js";

import { HTTP_STATUS, ROLE } from "../utils/constant.js";
import { tokenDecode } from "../middlewares/tokenHandler.js";
import Product from "../models/product.model.js";


//[GET] /getAllProduct for admin
export const getAllProductAdmin = async (req, res) => {
  const { page, limit, status } = Object.assign({}, req.query);
  try {
    var products;
    if (status === undefined) {
      products = await Product.find()
        .populate("subcategory")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .lean();
    } else {
      products = await Product.find({ status: status })
        .populate("subcategory")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .lean();
    }

    const totalRows = await Product.countDocuments();
    if (products) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        totalRows,
        products,
      });
    } else {
      sendWarning(res, "Get all product failed");
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] get total product by time
export const getTotalProductByTime = async (req, res) => {
  const { limit } = Object.assign({}, req.query);
  try {
    let query = {
      createdAt: {
        $lte: moment().toDate(),
        $gte: moment().subtract(1, limit).toDate(),
      },
    };
    const total = await Product.find(query).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      total,
    });
  } catch (error) {
    sendError(res, error);
  }
};
// Get all product for client
export const getAllProduct = async (req, res) => {
  const { page, limit, sortField, sortType } = Object.assign({}, req.query);

  try {
    const products = await Product.find({ status: "active" })
      .populate("subcategory")
      .limit(limit)
      .skip((page - 1) * limit)
      //.sort({ [sortField]: sortType })
      .sort({ createdAt: -1 })
      .lean();

    const totalRows = await Product.countDocuments({ status: "active" });
    if (products) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        totalRows,
        products,
      });
    } else {
      sendWarning(res, "Get all product failed");
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /:productId
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      "subcategory"
    );
    if (product) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        product,
      });
    } else {
      sendWarning(res, "Product not found");
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /subcategory/:subcategoryId
export const getProductBySubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const { page, limit, sortField, sortType } = Object.assign({}, req.query);

  try {
    const products = await Product.find({
      subcategory: subcategoryId,
    })
      .populate("subcategory")
      .limit(limit)
      .skip((page - 1) * limit)
      //.sort({ [sortField]: sortType })
      .sort({ createdAt: -1 })
      .lean();

    const totalRows = await Product.countDocuments({
      subcategory: subcategoryId,
    });

    if (products) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        totalRows,
        products,
      });
    } else {
      sendWarning(res, "Product not found");
    }
  } catch (error) {
    sendError(res, error);
  }
};

// [GET] /newest
export const getNewestProduct = async (req, res) => {
  const { page, limit, sortField, sortType } = Object.assign({}, req.query);

  try {
    const products = await Product.find({ status: "active" })
      .populate("subcategory")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      //.sort({ [sortField]: sortType })
      .lean();
    if (products) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        totalRows: 20,
        products,
      });
    } else {
      sendWarning(res, "Get newest product failed");
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /bestSelling
export const getBestSellingProduct = async (req, res) => {
  const { page, limit, sortField, sortType } = Object.assign({}, req.query);

  try {
    const products = await Product.find({ status: "active" })
      .populate("subcategory")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ selling: -1 })
      //.sort({ [sortField]: sortType })
      .lean();
    if (products) {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        products,
      });
    } else sendWarning(res, "Get best selling product failed!");
  } catch (error) {
    sendError(res, error);
  }
};
// [POST] /create
export const createProduct = async (req, res) => {
  const {
    name,
    code,
    images,
    price,
    available,
    description,
    tags,
    brand,
    subcategory,
    width,
    length,
    weight,
    height,
  } = req.body;

  const checkCode = await Product.findOne({ code: code }).lean();
  try {
    if (checkCode) return sendConflict(res, "code of Product already exist");
    const newProduct = await Product.create({
      name,
      code,
      images,
      price,
      available,
      description,
      tags,
      brand,
      subcategory,
      width,
      length,
      weight,
      height,
    });
    if (!newProduct) return sendWarning(res, "Create Product failed!");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      newProduct,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[PUT] /:productId/update
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    images,
    price,
    available,
    description,
    tags,
    brand,
    subcategory,
    width,
    length,
    weight,
    height,
  } = req.body;

  try {
    //Check product exist
    const checkProductId = await Product.findById(productId);
    if (checkProductId.length === 0)
      return sendNotFound(res, "ProductId not exist");

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          images,
          price,
          available,
          description,
          tags,
          brand,
          subcategory,
          width,
          length,
          weight,
          height,
        },
      },
      { new: true }
    ).populate("subcategory");

    if (!updateProduct) {
      sendWarning(res, "Update product failed");
    } else {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        product: updatedProduct,
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

export const changeProductStatus = async (req, res) => {
  const { productId } = req.params;

  try {
    //Check product exist
    const currentProduct = await Product.findById(productId);

    if (currentProduct.length === 0)
      return sendWarning(res, "Product is not exist");

    const currentStatus = currentProduct.status;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          status: currentStatus === "active" ? "inactive" : "active",
        },
      },
      { new: true }
    );
    if (!updatedProduct)
      return sendWarning(res, "Update product status failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      productStatus: updatedProduct.status,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /check-upc
export const checkCodeProduct = async (req, res) => {
  const { code } = req.query;
  try {
    const check = await Product.findOne({ code: code }).lean();

    if (check) return sendConflict(res, "code of Product already exist!!");
    else {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        message: "code of product usable.",
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /brand Get all brand
export const getAllBrand = async (req, res) => {
  try {
    const brands = await Product.distinct("brand");

    if (!brands) return sendWarning(res, "Get all warning failed");
    else {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        brands,
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /brand/check Check brand exist
export const checkBrandExist = async (req, res) => {
  const { brand } = req.body;
  try {
    const isBrandExist = await Product.find({ brand: brand.toLowerCase() });

    if (isBrandExist.length !== 0)
      return sendWarning(res, "Brand name already exist");
    else {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        message: "Brand name is useable",
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

export const searchProduct = async (req, res) => {
  const { name, code, page, limit, sortField, sortType } = Object.assign(
    {},
    req.query
  );

  var regex = {
    name: {
      $regex: name ? name : "",
      $options: "i",
    },
    code: {
      $regex: code ? code : "",
      $options: "i",
    },
  };

  //if user not logged in or user role is not admin or mod, return active product only
  const tokenDecoded = await tokenDecode(req);
  if (tokenDecoded) {
    const userId = tokenDecoded.id;
    const user = await User.findById(userId).select("username role");
    //check user role is user
    if (user.role === user) regex["status"] = "active";
  } else {
    regex["status"] = "active";
  }

  try {
    const products = await Product.find(regex)
      .populate("subcategory")
      .limit(limit)
      .skip((page - 1) * limit)
      //.sort({ [sortField]: sortType })
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Product.find(regex).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      products,
    });
  } catch (error) {
    sendError(res, error);
  }
};

export const filterProduct = async (req, res) => {
  const { page, limit, sortField, sortType } = req.query
  const { subCategoryId, brand, discount, rating } = req.query
  var query = {};
  if (subCategoryId !== undefined) query["subcategory"] = subCategoryId;
  if (brand !== undefined) {
    const brandArr = brand.split(",");
    query["brand"] = { $in: brandArr };
  }
  if (discount !== undefined) query["discount"] = { $lt: discount };
  if (rating !== undefined) query["avg_review"] = { $lt: rating };


  //if user not logged in or user role is not admin or mod, return active product only
  const tokenDecoded = await tokenDecode(req);
  if (tokenDecoded) {
    const userId = tokenDecoded.id;
    const user = await User.findById(userId).select("username role");
    //check user role is user
    if (user.role === user) query["status"] = "active";
  } else {
    query["status"] = "active";
  }

  try {
    const products = await Product.find(query)
      .populate("subcategory")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Product.find(query).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      products,
    });
  } catch (error) {
    sendError(res, error);
  }
};

