import express from "express";
import {
  getCommentById,
  getCommentByProductId,
  addComment,
  editComment,
  deleteComment,
  addReply,
} from "../controllers/comment.controller.js";
import {
  isValidCommentId,
  isValidProductId,
} from "../middlewares/commentValidation.js";
import checkRole from "../middlewares/roleHandler.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { validate } from "../middlewares/validation.js";
import { ROLE } from "../utils/constant.js";
import { ROUTES } from "../utils/routes.js";

const router = express.Router();


//get comment by id
router.get(
  ROUTES.COMMENT_BY_ID,
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  isValidCommentId,
  validate,
  getCommentById
);

//get comment by product id
router.get(
  ROUTES.COMMENT_BY_PRODUCT,
  isValidProductId,
  validate,
  getCommentByProductId
);

//Add comment
router.post("/", addComment);

//Add reply
router.put(ROUTES.REPLY, isValidCommentId, validate, addReply);

//Edit comment
router.put(
  ROUTES.COMMENT_BY_ID,
  verifyToken,
  isValidCommentId,
  validate,
  editComment
);

//delete comment
router.delete(
  ROUTES.COMMENT_BY_ID,
  verifyToken,
  isValidCommentId,
  validate,
  deleteComment
);

export default router;
