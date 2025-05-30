import express from "express";
import {
  getReviewById,
  getReviewByProductId,
  addReview,
  editReview,
  deleteReview,
} from "../controllers/review.controller.js";
import {
  isValidReviewId,
  isValidScore,
  isValidProductId,
} from "../middlewares/reviewValidation.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();


//Edit review
router.put(
  "/:reviewId",
  verifyToken,
  isValidReviewId,
  isValidScore,
  editReview
);

//Add review
router.post("/", verifyToken, isValidProductId, addReview);

//delete review
router.delete(ROUTES.REVIEW_BY_ID, verifyToken, isValidReviewId, deleteReview);

//get review by id
router.get(ROUTES.REVIEW_BY_ID, isValidReviewId, getReviewById);

//get review by product id
router.get(ROUTES.REVIEW_BY_PRODUCT_ID, getReviewByProductId);

export default router;
