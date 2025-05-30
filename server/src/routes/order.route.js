import express from "express";
const router = express.Router();

import checkRole from "../middlewares/roleHandler.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROLE } from "../utils/constant.js";
import {
  getAllOrder,
  createOrder,
  getOrderById,
  getOrderByUserId,
  searchOrder,
  changeOrderStatus,
  getTotalOrderByTime,
  getTotalRevenue,
  assignOrderToWarehouse,
  filterOrder,
  getTotalRevenueId,
} from "../controllers/order.controller.js";
import { ROUTES } from "../utils/routes.js";
import {
  checkValidStatus,
  checkValidProductQuantity,
  resolveDuplicateProduct,
  checkValidDate,
  isWarehouseUser,
  isValidPaymentType,
} from "../middlewares/orderValidation.js";
import { validate } from "../middlewares/validation.js";


// get total Order by time
router.get(
  ROUTES.TOTAL_ORDER_BY_TIME,
  checkValidDate,
  validate,
  getTotalOrderByTime
);

// get total revenue
router.get(ROUTES.TOTAL_REVENUE, checkValidDate, validate, getTotalRevenue);

// get total revenue by product Id
router.get(ROUTES.TOTAL_REVENUE_BY_PRODUCT_ID, getTotalRevenueId);

//Search order
router.get(ROUTES.SEARCH, verifyToken, searchOrder);

//Filter order
router.get(ROUTES.FILTER, verifyToken, filterOrder);

//get order by id
router.get(ROUTES.ORDER_BY_ID, verifyToken, getOrderById);

//get order by user id
router.get(ROUTES.ORDER_BY_USER_ID, verifyToken, getOrderByUserId);

//Create order
router.post(
  "/",
  resolveDuplicateProduct,
  checkValidProductQuantity,
  isValidPaymentType,
  validate,
  createOrder
);

//assign to warehouse user
router.put(
  ROUTES.ASSIGN_ORDER,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isWarehouseUser,
  validate,
  assignOrderToWarehouse
);

//change order status
router.put(
  "/status/:orderId",
  verifyToken,
  checkRole([ROLE.ADMIN, ROLE.OWNER, ROLE.MOD]),
  checkValidStatus,
  validate,
  changeOrderStatus
);

//get all order
router.get(
  "/",
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD, ROLE.WAREHOUSE]),
  getAllOrder
);

//Search order

export default router;
