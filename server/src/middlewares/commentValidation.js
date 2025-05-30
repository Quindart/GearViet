import { check } from "express-validator";
import { isValidId } from "./validation.js";


export const isValidCommentId = [
  check("commentId").custom((value) => {
    if (!isValidId(value)) {
      return Promise.reject("Invalid comment id");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

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

export const isUncategory = [
  check("categoryId").custom((value) => {
    if (value === UNCATEGORY_ID) {
      return Promise.reject("Can't delete this category");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isValidSubcategoryId = [
  check("subCategoryId").custom((value) => {
    if (!isValidId(value)) {
      return Promise.reject("Invalid subcategory id");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];
