import mongoose from 'mongoose';
import { tokenDecode } from "../middlewares/tokenHandler.js";
import Comment from "../models/comment.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { HTTP_STATUS } from "../utils/constant.js";
import { sendWarning, sendError } from "../utils/response.js";


//get comment by id
export const getCommentById = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId)
      .populate("user", "username avatar")
      .populate("reply.user", "username avatar");
    if (!comment) return sendWarning(res, "Get comment by id failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      comment,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//get comment by product id
export const getCommentByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    const comments = await Comment.find({ product: productId })
      .populate("user", "username avatar")
      .populate("reply.user", "username avatar");
    if (!comments) return sendWarning(res, "Get comment by product id failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      comments,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//add comment
export const addComment = async (req, res) => {
  var userId;
  var { productId, personName, content } = req.body;
  try {
    //if user is loged in, get name from User document
    const tokenDecoded = await tokenDecode(req);
    if (tokenDecoded) {
      userId = tokenDecoded.id;
      const user = await User.findById(userId).select(
        "username name gender avatar"
      );
      personName = user.username;
    }

    const newComment = await Comment.create({
      product: productId,
      user: userId,
      personName,
      content,
    });

    if (!newComment) return sendWarning(res, "Add comment failed");

    this.updateTotalComment(productId);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      comment: newComment,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//edit comment. Only for loged in user, admin, mod can't do this
export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    var userId = req.user._id.toString();

    //check comment is exist
    const currentComment = await Comment.findById(commentId);
    if (!currentComment) return sendWarning(res, "Comment not found");

    //Check user is author of this comment
    const commentUser = currentComment.user
      ? currentComment.user.toString()
      : undefined;
    if (userId !== commentUser)
      return sendWarning(res, "You can't edit this comment");

    //update comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: {
          content,
        },
      },
      { new: true }
    )
      .populate("user", "username avatar")
      .populate("reply.user", "username avatar");
    if (!updatedComment) return sendWarning(res, "Edit comment failed");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      comment: updatedComment,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//delete comment. Only for loged in user, admin, mod can't do this
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id.toString();

    //check comment is exist
    const currentComment = await Comment.findById(commentId);
    if (!currentComment) return sendWarning(res, "Comment not found");

    //Check user is author of this comment
    const commentUser = currentComment.user
      ? currentComment.user.toString()
      : undefined;
    if (userId !== commentUser)
      return sendWarning(res, "You can't delete this comment");

    //Delete comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) return sendWarning(res, "Delete category failed");

    //update total comment to product
    await this.updateTotalComment(deletedComment.product);
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      message: "Delete comment successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

//add reply
export const addReply = async (req, res) => {
  var userId;
  const { commentId } = req.params;
  var { personName, content } = req.body;
  try {
    //if user is loged in, get name from User document
    const tokenDecoded = await tokenDecode(req);
    if (tokenDecoded) {
      userId = tokenDecoded.id;
      const user = await User.findById(userId).select(
        "username name gender avatar"
      );
      personName = user.username;
    }

    const newComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: {
          reply: {
            user: userId,
            personName,
            content,
          },
        },
      },
      {
        new: true,
      }
    )
      .populate("user", "username avatar")
      .populate("reply.user", "username avatar");

    if (!newComment) return sendWarning(res, "Add reply failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      comment: newComment,
    });
  } catch (error) {
    sendError(res, error);
  }
};

export const updateTotalComment = async (productId) => {
  const comment = await Comment.find({ product: productId });

  await Product.findByIdAndUpdate(productId, {
    $set: { totalComment: comment.length },
  });
};
