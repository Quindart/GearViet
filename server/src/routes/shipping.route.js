import express from "express";
import {
  createShippingOrder,
  cancelShippingOrder,
  detailShippingOrder,
  getAvailableServices,
  getFee,
  getProvince,
  getDistrict,
  getWard,
} from "../controllers/shipping.controller.js";
import { validate } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();


//create shipping order route
router.post(ROUTES.CREATE, createShippingOrder);

//cancel shipping order route
router.post(ROUTES.CANCEL, cancelShippingOrder);

//detail shipping order route
router.get(ROUTES.DETAIL, detailShippingOrder);

//get available services
router.get(ROUTES.AVAILABLE_SERVICES, getAvailableServices);

//get fee
router.get(ROUTES.FEE, getFee);

//get province
router.get(ROUTES.PROVINCE, getProvince);

//get district
router.get(ROUTES.DISTRICT, getDistrict);

//get ward
router.get(ROUTES.WARD, getWard);

export default router;
