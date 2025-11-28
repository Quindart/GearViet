import express from "express";
import checkRole from "../middlewares/roleHandler.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROLE } from "../utils/constant.js";

import {
  getProductById,
  getAllProduct,
  updateProduct,
  getNewestProduct,
  createProduct,
  checkCodeProduct,
  changeProductStatus,
  getProductBySubcategory,
  getAllBrand,
  checkBrandExist,
  getAllProductAdmin,
  searchProduct,
  filterProduct,
  getBestSellingProduct,
  getTotalProductByTime,
} from "../controllers/product.controller.js";

import {
  isValidProductId,
  isValidPrice,
  isValidAvailable,
  isSubCategoryExist,
  checkValidDate,
} from "../middlewares/productValidation.js";

import { validate } from "../middlewares/validation.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();

//Check product code
router.get(
  ROUTES.CHECK_PRODUCT_CODE,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  checkCodeProduct
);

router.get(ROUTES.FILTER, filterProduct);

//Get all admin product
router.get(
  ROUTES.PRODUCT_ADMIN,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  getAllProductAdmin
);

//get total product by time
router.get(
  ROUTES.TOTAL_PRODUCT_TIME,
  checkValidDate,
  validate,
  getTotalProductByTime
);

//Get product by subcategory
router.get(ROUTES.PRODUCT_BY_SUBCATEGORY, getProductBySubcategory);

//Get all brand
router.get(ROUTES.BRAND, getAllBrand);

//Check brand name
router.get(ROUTES.CHECK_BRAND, checkBrandExist);

//Get newest product
router.get(ROUTES.NEWEST_PRODUCT, getNewestProduct);

//Get best selling product
router.get(ROUTES.BEST_SELLING_PRODUCT, getBestSellingProduct);

//Search product
router.get(ROUTES.SEARCH, searchProduct);

//Get product by Id
router.get(ROUTES.PRODUCT_BY_ID, isValidProductId, validate, getProductById);

//Add product
router.post(
  "/",
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidPrice,
  isValidAvailable,
  isSubCategoryExist,
  validate,
  createProduct
);

//Update product
router.put(
  ROUTES.PRODUCT_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidProductId,
  isValidPrice,
  isValidAvailable,
  isSubCategoryExist,
  validate,
  updateProduct
);

//Change product status (soft delete product)
router.put(
  ROUTES.CHANGE_PRODUCT_STATUS,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidProductId,
  validate,
  changeProductStatus
);

router.get("/", getAllProduct);

export default router;
