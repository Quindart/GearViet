import mongoose from 'mongoose';
import { tokenDecode } from '../middlewares/tokenHandler.js';
import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import { HTTP_STATUS } from '../utils/constant.js';
import { sendWarning, sendError } from '../utils/response.js';


//get review by id
export const getReviewById = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) return sendWarning(res, "Get review by id failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      review,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//get review by product id
export const getReviewByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ product: productId });
    if (!reviews) return sendWarning(res, "Get review by product id failed");
    const stats = await Review.aggregate([
      {
        $match: { product: new mongoose.Types.ObjectId(productId) },
      },
      {
        $group: {
          _id: "$score",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      reviews,
      stats,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//add review
export const addReview = async (req, res) => {
  const { user } = req;
  const { productId, content, score } = req.body;
  const userId = user._id;
  const username = user.username;
  try {
    const product = await Product.findById(productId);
    if (!product) return sendWarning(res, "Product not found");

    const newReview = await Review.create({
      product: productId,
      user: userId,
      name: username,
      content,
      score,
    });
    if (!newReview) return sendWarning(res, "Add review failed");

    await updateAvgReview(productId);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      review: newReview,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//edit review. Only for loged in user, admin, mod can't do this
export const editReview = async (req, res) => {
  const userId = req.user._id;
  const { reviewId } = req.params;
  const { content, score } = req.body;

  try {
    const isCorrectUser = await checkUser(reviewId, userId);
    if (!isCorrectUser) return sendWarning(res, "You can't edit this review");

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        $set: {
          content,
          score,
        },
      },
      { new: true }
    );
    if (!updatedReview) return sendWarning(res, "Edit review failed");

    await updateAvgReview(updatedReview.product);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      review: updatedReview,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//delete review. Only for loged in user, admin, mod can't do this
export const deleteReview = async (req, res) => {
  const userId = req.user._id;
  const { reviewId } = req.params;

  try {
    const isCorrectUser = await checkUser(reviewId, userId);
    if (!isCorrectUser) return sendWarning(res, "You can't edit this review");

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) return sendWarning(res, "Delete category failed");

    await updateAvgReview(deletedReview.product);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      msg: "Delete review successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

const checkUser = async (reviewId, userId) => {
  const response = await Review.find({
    _id: reviewId,
    user: userId,
  });
  if (response.length === 0) return false;
  return true;
};

const updateAvgReview = async (productId) => {
  //caculate avg_review and update to product
  const result = await Review.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: "$product", avg_review: { $avg: "$score" } } },
  ]);

  await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        avg_review: result[0].avg_review,
      },
    },
    { new: true }
  );
};
