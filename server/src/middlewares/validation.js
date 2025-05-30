import { validationResult } from "express-validator";
import {
  HTTP_STATUS,
  ROLE,
  REVIEW_SCORE,
  STATUS,
  ORDER_STATUS,
  DATE,
} from "../utils/constant.js";

import mongoose from 'mongoose'

const listValidRole = Object.values(ROLE);
const listValidStatus = Object.values(STATUS);
const listValidOrderStatus = Object.values(ORDER_STATUS);
const listValidDate = Object.values(DATE);

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: errors.array()[0].msg,
    });
  }
  next();
};

export const isValidId = (value) => mongoose.Types.ObjectId.isValid(value);

export const isValidRole = (value) => listValidRole.includes(value);

export const isValidDate = (value) => listValidDate.includes(value);

export const isValidStatus = (value) => listValidStatus.includes(value);

export const isValidOrderStatus = (value) => listValidOrderStatus.includes(value);

export const isValidReviewScore = (value) => REVIEW_SCORE.includes(value);
