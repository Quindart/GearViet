import { sendError } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constant.js";
import axios from "axios";
import { ROUTES } from "../utils/routes.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { getCachedData, deleteCacheByKey } from "../utils/cache.js";
import { createOrderController, increaseProductSold } from "./order.controller.js";
import config from "config";
import dateFormat from "dateformat";
import { format as dateFnsFormat } from "date-fns";
import qs from "qs";
import crypto from "crypto";

export const createPaymentUrl = async (req, res, next) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = config.get("vnp_TmnCode") || process.env.VNP_TMN_CODE;
  var secretKey = config.get("vnp_HashSecret") || process.env.VNP_HASH_SECRET;
  var vnpUrl = config.get("vnp_Url") || process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = req.body.returnUrl || config.get("vnp_ReturnUrl") || process.env.VNP_RETURN_URL || "http://localhost:3002/checkout/success";

  if (!tmnCode || !secretKey) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: "VNPay configuration is missing. Please set VNP_TMN_CODE and VNP_HASH_SECRET in environment variables or config file.",
    });
  }

  var date = new Date();

  var createDate = dateFnsFormat(date, "yyyyMMddHHmmss");
  var orderId = req.body.orderId || dateFormat(date, "HHmmss");
  var amount = req.body.amount;
  var bankCode = "NCB";
  // var bankCode = req.body.bankCode;

  var orderInfo = req.body.orderDescription || `Order ${orderId}`;
  var orderType = 100000;
  var locale = "vn";
  // var locale = req.body.language;
  // if (locale === null || locale === "") {
  //   locale = "vn";
  // }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = qs.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

  // res.redirect(vnpUrl);

  return res.status(200).json({
    success: true,
    status: 200,
    vnpUrl: vnpUrl,
    url: vnpUrl,
  });
};

export const paymentSuccess = async (req, res) => {
  const data = req.query;
  const {
    vnp_TxnRef,
    vnp_ResponseCode,
    vnp_PayDate,
    vnp_TransactionNo,
    vnp_Amount,
  } = data;

  try {
    // vnp_TxnRef should be the orderId we sent when creating payment URL
    if (!vnp_TxnRef) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "Missing vnp_TxnRef",
      });
    }

    // Find the order by ID (vnp_TxnRef is the orderId)
    const order = await Order.findById(vnp_TxnRef);

    if (!order) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        status: 404,
        message: "Order not found",
      });
    }

    // Check payment response code (00 means success)
    if (vnp_ResponseCode === "00") {
      // Payment successful - update order status
      var payDate = null;
      if (vnp_PayDate) {
        payDate = new Date(
          vnp_PayDate.replace(
            /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
            "$4:$5:$6 $2/$3/$1"
          )
        );
      }

      // Update order payment status and auto-confirm if pending
      const updateData = {
        paymentStatus: "paid",
        ...(vnp_TransactionNo && { transactionNo: vnp_TransactionNo }),
        ...(payDate && { payDate: payDate }),
      };
      
      // Auto-confirm order if status is pending
      if (order.status === "pending") {
        updateData.status = "confirmed";
      }
      
      const updatedOrder = await Order.findByIdAndUpdate(
        vnp_TxnRef,
        {
          $set: updateData,
        },
        { new: true }
      );

      // Increase product sold count
      if (updatedOrder && updatedOrder.products) {
        for (const item of updatedOrder.products) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: {
              selling: item.quantity,
            },
          });
        }
      }

      return res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        message: "Payment successful",
        orderId: updatedOrder._id.toString(),
        transactionNo: vnp_TransactionNo || "",
        amount: vnp_Amount ? parseInt(vnp_Amount) / 100 : 0,
      });
    } else {
      // Payment failed
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "Payment failed",
        orderId: order._id.toString(),
      });
    }
  } catch (error) {
    console.error("Payment success error:", error);
    return sendError(res, error);
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
