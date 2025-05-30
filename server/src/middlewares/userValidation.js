import { check } from "express-validator";
import { UNCATEGORY_ID } from "../utils/constant.js";
import {
  isValidId,
  isValidRole,
  isValidStatus,
  isValidDate,
} from "./validation.js";
import User from "../models/user.model.js";


export const isValidUserId = [
  check("userId").custom((value) => {
    if (!isValidId(value)) {
      return Promise.reject("Invalid user id");
    } else return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const checkValidUserStatus = [
  check("status").custom((value) => {
    if (value !== undefined) {
      if (!isValidStatus(value)) {
        return Promise.reject("Invalid status");
      }
    }
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const checkValidUserRole = [
  check("role").custom((value) => {
    if (value !== undefined) {
      if (!isValidRole(value)) {
        return Promise.reject("Invalid role");
      }
    }
    return Promise.resolve();
  }),
  (req, res, next) => {
    next();
  },
];

export const isMasterAdmin = [
  check("userId").custom((value) => {
    const masterAdminId = process.env.MASTER_ADMIN_ID;
    if (value === masterAdminId) {
      return Promise.reject("Can't get/edit this user");
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
