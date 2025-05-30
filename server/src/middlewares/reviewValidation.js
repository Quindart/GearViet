import { check } from "express-validator";
import { isValidId, isValidReviewScore } from "./validation.js";

export const isValidReviewId = [
  check("reviewId").custom((value) => {
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

export const isValidScore = [
  check("score").custom((value) => {
    if (!isValidReviewScore(value)) {
      return Promise.reject("Invalid score");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];
