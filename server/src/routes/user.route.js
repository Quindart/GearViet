import express from "express";
import {
  getAllUser,
  getUserById,
  editUser,
  getUserDetail,
  changeRoleAndStatus,
  searchUser,
  filterUser,
  getTotalUserByTime,
} from "../controllers/user.controller.js";
import checkRole from "../middlewares/roleHandler.js";
import { validate } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROLE } from "../utils/constant.js";
import {
  isValidUserId,
  checkValidUserStatus,
  checkValidUserRole,
  isMasterAdmin,
  checkValidDate,
} from "../middlewares/userValidation.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();


//get user detail
router.get(ROUTES.USER_DETAIL, verifyToken, getUserDetail);

//filter user
router.get(
  ROUTES.FILTER,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  checkValidUserRole,
  checkValidUserStatus,
  validate,
  filterUser
);

//get total users by time (create)
router.get(
  ROUTES.TOTAL_USER_BY_TIME,
  checkValidDate,
  validate,
  getTotalUserByTime
);

// search user
router.get(
  ROUTES.SEARCH,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  searchUser
);

// get user by id
router.get(
  ROUTES.USER_BY_ID,
  verifyToken,
  isValidUserId,
  isMasterAdmin,
  validate,
  getUserById
);

//Change user role and status
router.put(
  ROUTES.CHANGE_USER_ROLE_AND_STATUS,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN]),
  isValidUserId,
  isMasterAdmin,
  checkValidUserRole,
  checkValidUserStatus,
  validate,
  changeRoleAndStatus
);

//edit user
router.put(ROUTES.USER_BY_ID, verifyToken, isValidUserId, validate, editUser);

/*
 * get all user
 *  Add verify token with route require authentication
 *  Add checkrole with route require role.
 */
router.get("/", verifyToken, checkRole([ROLE.OWNER, ROLE.ADMIN]), getAllUser);

export default router;
