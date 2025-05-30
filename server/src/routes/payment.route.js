import express from "express";
import { validate } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROUTES } from "../utils/routes.js";
import {
  createPaymentUrl,
  paymentSuccess,
} from "../controllers/payment.controller.js";

const router = express.Router();


//create shipping order route
router.post(ROUTES.CREATE_PAYMENT_URL, createPaymentUrl);

router.get(ROUTES.PAYMENT_SUCCESS, paymentSuccess);

export default router;
