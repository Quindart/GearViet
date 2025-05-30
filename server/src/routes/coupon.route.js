import express from "express";
import {
  getAllCoupon,
  getCouponById,
  addCoupon,
  updateCouponStatus,
  searchCoupon,
  checkCodeCoupon,
  filterCoupon,
} from "../controllers/coupon.controller.js";
import {
  isValidDiscount,
  isValidDate,
  checkValidStatus,
} from "../middlewares/couponValidation.js";
import checkRole from "../middlewares/roleHandler.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROLE } from "../utils/constant.js";
import { validate } from "../middlewares/validation.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();

//search coupon
router.get(
  ROUTES.SEARCH,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  searchCoupon
);

//check code coupon
router.get("/check-udc", checkCodeCoupon);

//filter copupon
router.get(
  ROUTES.FILTER,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  isValidDate,
  checkValidStatus,
  validate,
  filterCoupon
);

//get coupon by id
router.get(
  ROUTES.COUPON_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  getCouponById
);

//Add coupon
router.post(
  "/",
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  isValidDiscount,
  isValidDate,
  validate,
  addCoupon
);

//Edit coupon
router.put(
  ROUTES.COUPON_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  checkValidStatus,
  validate,
  updateCouponStatus
);

//get all coupon
router.get("/", verifyToken, checkRole([ROLE.OWNER, ROLE.ADMIN]), getAllCoupon);

export default router;
