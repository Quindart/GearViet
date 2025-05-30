import express from "express";
import checkRole from "../middlewares/roleHandler.js";
import { validate } from "../middlewares/validation.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROLE } from "../utils/constant.js";
import {
  getAllCategory,
  updateCategory,
  getCategoryById,
  createSubcategory,
  createCategory,
  updateSubcategory,
  deleteSubcategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import {
  isValidCategoryId,
  isUncategory,
  isValidSubcategoryId,
  isCategoryExist,
  isUnsubcategory,
} from "../middlewares/categoryValidation.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();

//Delete category
router.delete(
  ROUTES.CATEGORY_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidCategoryId,
  isUncategory,
  validate,
  deleteCategory
);

//Delete subcategory
router.delete(
  ROUTES.SUBCATEGORY_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidSubcategoryId,
  isUnsubcategory,
  deleteSubcategory
);

//Add category
router.post(
  "/",
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  createCategory
);

//Add subcategory
router.post(
  ROUTES.SUBCATEGORY,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidCategoryId,
  isCategoryExist,
  validate,
  createSubcategory
);

//Edit category
router.put(
  ROUTES.CATEGORY_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidCategoryId,
  isUncategory,
  validate,
  updateCategory
);

//Edit subcategory
router.put(
  ROUTES.SUBCATEGORY_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidSubcategoryId,
  isUnsubcategory,
  validate,
  updateSubcategory
);

// get category by id
router.get(ROUTES.CATEGORY_BY_ID, isValidCategoryId, validate, getCategoryById);

//get all category
router.get("/", getAllCategory);

export default router;
