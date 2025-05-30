import express from "express";
import {
  login,
  register,
  resetPassword,
  changePassword,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.js";
import { body } from "express-validator";
import User from "../models/user.model.js";
import {
  isValidUsernameLength,
  isValidPasswordLength,
  isValidEmail,
  isUsernameExist,
  isMatchPasswordRegex,
  isConfirmPasswordMatch,
} from "../middlewares/authValidation.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();


//login route
router.post(
  ROUTES.LOGIN,
  isValidUsernameLength,
  isValidPasswordLength,
  validate,
  login
);

//register route
router.post(
  ROUTES.REGISTER,
  isValidUsernameLength,
  isUsernameExist,
  isValidPasswordLength,
  isMatchPasswordRegex,
  isConfirmPasswordMatch,
  isValidEmail,
  validate,
  register
);

//Forgot password
router.post(ROUTES.FORGOT_PASSWORD, resetPassword);

//Change password
router.put(
  ROUTES.CHANGE_PASSWORD,
  verifyToken,
  isValidPasswordLength,
  isMatchPasswordRegex,
  isConfirmPasswordMatch,
  validate,
  changePassword
);

export default router;
