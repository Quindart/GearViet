import { isValidOrderStatus, isValidDate } from "./validation.js";
import { check } from "express-validator";
import User from "../models/user.model.js";

export const checkValidStatus = [
  check("status").custom((value) => {
    if (!isValidOrderStatus(value)) {
      return Promise.reject("Invalid order status");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const checkValidProductQuantity = [
  check("products.*.quantity").custom((value) => {
    if (value <= 0) {
      return Promise.reject("Product quantity must be greater than 0");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const resolveDuplicateProduct = (req, res, next) => {
  const { products } = req.body;
  const result = products.reduce((acc, e) => {
    const found = acc.find((x) => e.product === x.product);
    found ? (found.quantity += e.quantity) : acc.push(e);
    return acc;
  }, []);

  req.body.products = result;
  next();
};

export const checkValidDate = [
  check("limit").custom((value) => {
    if (!isValidDate(value)) {
      return Promise.reject("Invalid Date");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isWarehouseUser = [
  check("warehouseUserId").custom(async (value) => {
    const user = await User.findById(value);
    if (!user) return Promise.reject("User not found");
    if (user.role !== "warehouse")
      return Promise.reject("User is not warehouse user");
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isValidPaymentType = [
  check("paymentType").custom(async (value) => {
    const validPaymentType = ["online", "offline"];
    if (!validPaymentType.includes(value))
      return Promise.reject("Invalid payment type");
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];
