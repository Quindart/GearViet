import { sendError } from "../utils/response.js";
import { HTTP_STATUS } from "../utils/constant.js";
import axios from "axios";
import { ROUTES } from "../utils/routes.js";
import Order from "../models/order.model.js";
import { getCachedData, deleteCacheByKey } from "../utils/cache.js";
import { createOrderController } from "./order.controller.js";

export const createPaymentUrl = async (req, res, next) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var config = require("config");
  var dateFormat = require("dateformat");
  var dateFns = require("date-fns");

  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");
  var vnpUrl = config.get("vnp_Url");
  var returnUrl = config.get("vnp_ReturnUrl");

  var date = new Date();

  var createDate = dateFns.format(date, "yyyyMMddHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var amount = req.body.amount;
  var bankCode = "NCB";
  // var bankCode = req.body.bankCode;

  var orderInfo = req.body.orderDescription;
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

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  // res.redirect(vnpUrl);

  return res.status(200).json({
    msg: "success",
    url: vnpUrl,
  });
};

export const paymentSuccess = async (req, res) => {
  //Cap nhat DB
  const data = req.query;
  const {
    vnp_OrderInfo,
    vnp_ResponseCode,
    vnp_PayDate,
    vnp_TransactionNo,
    vnp_Amount,
  } = data;
  const redisKey = vnp_OrderInfo.split("_")[1];
  const orderData = await getCachedData(redisKey);

  var payDate = new Date(
    vnp_PayDate.replace(
      /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
      "$4:$5:$6 $2/$3/$1"
    )
  );

  try {
    if (vnp_ResponseCode !== "00" || orderData === null) {
      //redirect to failed page
    } else {
      const { products, coupon, shippingDetail, serviceTypeId, userId } =
        JSON.parse(orderData);

      //Cap nhat order Data vao bang Order
      const newOrder = await createOrderController(
        products,
        coupon,
        shippingDetail,
        serviceTypeId,
        "online",
        "paid",
        userId,
        vnp_TransactionNo,
        payDate.toString()
      );

      increaseProductSold(products);

      //clear redis
      deleteCacheByKey(redisKey);
      res.redirect(
        `https://ecomx-client1.netlify.app/success?code=${newOrder.code}&transactionNo=${vnp_TransactionNo}&payDate=${vnp_PayDate}&total=${vnp_Amount}`
      );
    }
  } catch (error) {
    // console.log(error);
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
