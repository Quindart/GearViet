import { check } from "express-validator";
import User from "../models/user.model.js";


export const isValidUsernameLength = [
  check("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long"),
  (req, res, next) => {
    next();
  },
];

export const isValidPasswordLength = [
  check("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    next();
  },
  check("newPassword")
    .optional()
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
  (req, res, next) => {
    next();
  },
];

export const isValidEmail = [
  check("email").isEmail().withMessage("Email is wrong"),
  (req, res, next) => {
    next();
  },
];

export const isUsernameExist = [
  check("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) return Promise.reject("Username already exists");
      return true;
    });
  }),
  (req, res, next) => {
    next();
  },
];

export const isMatchPasswordRegex = [
  check("password")
    .optional()
    .custom((value) => {
      const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d@$!%*#?&]{8,}$/;
      if (!regex.test(value))
        return Promise.reject(
          "Password must be at least 1 Upper, 1 lower and 1 number character"
        );
      return true;
    }),
  (req, res, next) => {
    next();
  },
  check("newPassword")
    .optional()
    .custom((value) => {
      const regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d@$!%*#?&]{8,}$/;
      if (!regex.test(value))
        return Promise.reject(
          "New password must be at least 1 Upper, 1 lower and 1 number character"
        );
      return true;
    }),
  (req, res, next) => {
    next();
  },
];

export const isConfirmPasswordMatch = [
  check("confirmPassword")
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        return Promise.reject("Passwords does not match");
      return true;
    }),
  (req, res, next) => {
    next();
  },
  check("confirmNewPassword")
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        return Promise.reject(
          "New password and confirm new password does not match"
        );
      return true;
    }),
  (req, res, next) => {
    next();
  },
];

export const isValidFirstName = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),
  (req, res, next) => {
    next();
  },
];

export const isValidLastName = [
  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),
  (req, res, next) => {
    next();
  },
];

export const isValidPhone = [
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-6889]|9[0-46-9])[0-9]{7}$/)
    .withMessage("Invalid Vietnamese phone number format"),
  (req, res, next) => {
    next();
  },
];

export const isPhoneExist = [
  check("phone").custom((value) => {
    return User.findOne({ phone: value }).then((user) => {
      if (user) return Promise.reject("Phone number already exists");
      return true;
    });
  }),
  (req, res, next) => {
    next();
  },
];
