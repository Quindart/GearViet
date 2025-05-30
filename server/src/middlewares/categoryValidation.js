import { check } from "express-validator";
import { UNCATEGORY_ID, UNSUBCATEGORY_ID } from "../utils/constant.js";
import { isValidId } from "./validation.js";
import Category from "../models/category.model.js";


export const isValidCategoryId = [
  check("categoryId").custom((value) => {
    if (!isValidId(value)) {
      return Promise.reject("Invalid category id");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isCategoryExist = [
  check("categoryId").custom(async (value) => {
    const category = await Category.findById(value);
    if (!category) {
      return Promise.reject("Category not exists");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isUncategory = [
  check("categoryId").custom((value) => {
    if (value === UNCATEGORY_ID) {
      return Promise.reject("Can't edit/delete this category");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isUnsubcategory = [
  check("subcategoryId").custom((value) => {
    if (value === UNSUBCATEGORY_ID) {
      return Promise.reject("Can't edit/delete this sub category");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isValidSubcategoryId = [
  check("subcategoryId").custom((value) => {
    if (!isValidId(value)) {
      return Promise.reject("Invalid subcategory id");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];
