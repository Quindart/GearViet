import { check } from "express-validator";
import { UNCATEGORY_ID, UNSUBCATEGORY_ID } from "../utils/constant.js";
import { isValidId, isValidDate } from "./validation.js";
import Product from "../models/product.model.js";
import Subcategory from "../models/subcategory.model.js";


export const isValidProductId = [
  check("productId").custom((value) => {
    if (!isValidId(value)) {
      return Promise.reject("Invalid product id");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isValidPrice = [
  check("price").custom((value) => {
    if (value !== undefined) {
      if (typeof value !== "number") {
        return Promise.reject("Price must be a number");
      }
      if (value <= 0) {
        return Promise.reject("Price must be greater than 0");
      } else return Promise.resolve();
    }
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isSubCategoryExist = [
  check("subcategory").custom(async (value) => {
    if (value !== undefined) {
      const subcategory = await Subcategory.findById(value);
      if (!subcategory) {
        return Promise.reject("Subcategory not exists");
      } else return Promise.resolve();
    }
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isValidAvailable = [
  check("available")
    .optional()
    .custom((value) => {
      if (typeof value !== "number") {
        return Promise.reject("Invalid available value");
      }
      if (value < 0) {
        return Promise.reject("Invalid available value");
      } else return Promise.resolve();
    }),
  (req, res, next) => {
    next();
  },
];

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
