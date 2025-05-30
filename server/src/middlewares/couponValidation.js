import { check } from "express-validator";
import { UNCATEGORY_ID, UNSUBCATEGORY_ID } from "../utils/constant.js";
import Coupon from "../models/coupon.model.js";
import { isValidStatus } from "./validation.js";


export const isValidDiscount = [
  check("discount").custom((value) => {
    if (typeof value !== "number") {
      return Promise.reject("Invalid discount value");
    }
    if (value <= 0 || value > 100) {
      return Promise.reject("Invalid discount value");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isValidAvailable = [
  check("available").custom((value) => {
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

export const isValidDate = [
  check(["startDate", "endDate"])
    .not()
    .isEmpty()
    .withMessage("startDate, endDate is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date value"),
  check("startDate").custom((value, { req }) => {
    const startDate = new Date(value);
    const endDate = new Date(req.body.endDate);
    if (startDate > endDate) {
      return Promise.reject("StartDate must be lower than endDate");
    }
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const checkValidStatus = [
  check("status").custom((value) => {
    if (!isValidStatus(value)) {
      return Promise.reject("Invalid coupon status");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];
