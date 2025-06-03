import Coupon from "../models/coupon.model.js";
import {
  sendWarning,
  sendError,
  sendConflict,
} from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constant.js";

//[GET] /getAllCoupon
export const getAllCoupon = async (req, res) => {
  const { page, limit } = Object.assign({}, req.query);
  try {
    const coupon = await Coupon.find()
      .select(
        "code discount startDate endDate available status createdAt updatedAt"
      )
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();

    if (!coupon) sendWarning(res, "Get list coupon failed!");

    const totalRows = await Coupon.countDocuments();
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      coupon,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /:couponId
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.couponId).lean();
    if (!coupon) return sendWarning(res, "Get coupon failed!");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      coupon,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[POST] /addCoupon
export const addCoupon = async (req, res) => {
  const { code, discount, startDate, endDate, available } = req.body;
  const checkCode = await Coupon.findOne({ code: code }).lean();
  try {
    if (checkCode) return sendConflict(res, "code of Coupon already exist");
    const newCoupon = await Coupon.create({
      code,
      discount,
      startDate,
      endDate,
      available,
    });
    if (!newCoupon) return sendWarning(res, "Add Coupon failed!");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      newCoupon,
    });
  } catch (error) {
    sendError(res, error);
  }
};
//[post] check code
export const checkCodeCoupon = async (req, res) => {
  const { code } = Object.assign({}, req.query);
  try {
    const result = await checkCode(code);
    const discount = result.discount;
    if (typeof result === "string") {
      return sendWarning(res, result);
    } else {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        discount,
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

export const checkCode = async (code) => {
  const now = new Date();
  const check = await Coupon.findOne({ code: code }).lean();
  if (!check) return "code not found!";
  if (check.status !== "active") return "code is not available!";

  if (now < check.startDate || now > check.endDate)
    return "outside the time allowed!";
  if (check.available <= 0) return "Code has been used up!";
  return check;
};

//[PUT] /updateCouponStatus ???Hold
export const updateCouponStatus = async (req, res) => {
  const { couponId } = Object.assign({}, req.params);
  const { status } = req.body;
  const checkCode = await Coupon.findById(couponId).lean();

  try {
    if (!checkCode) return sendWarning(res, "Coupon not found!");
    const newCoupon = await Coupon.findByIdAndUpdate(
      couponId,
      {
        $set: {
          status,
        },
      },
      { new: true }
    ).select("code discount startDate endDate available status");

    if (!newCoupon) sendWarning(res, "edit coupon failed!");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      newCoupon,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /searchCoupon
export const searchCoupon = async (req, res) => {
  const { code, page, limit } = Object.assign({}, req.query);

  var regex = {
    code: {
      $regex: code ? code : "",
      $options: "i",
    },
  };

  try {
    const coupons = await Coupon.find(regex)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Coupon.find(regex).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      coupons,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//GET filter coupon
export const filterCoupon = async (req, res) => {
  const { page, limit } = Object.assign({}, req.query);
  const { startDate, endDate, status } = Object.assign({}, req.body);

  if (startDate === undefined || endDate === undefined)
    return sendWarning(res, "Start date and endDate is required");

  var regex = {
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  if (status !== undefined) regex["status"] = status;
  try {
    const coupons = await Coupon.find(regex)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await Coupon.find(regex).countDocuments();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      coupons,
    });
  } catch (error) {
    sendError(res, error);
  }
};

