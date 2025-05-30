import { sendError } from '../utils/response.js';
import { HTTP_STATUS, ORDER_STATUS } from '../utils/constant.js';
import axios from 'axios';
import { ROUTES } from '../utils/routes.js';
import Order from '../models/order.model.js';


const BASE_URL = process.env.GHN_API_BASEURL;
const BASE_URL_V1 = process.env.GHN_API_BASEURL_V1;
const TOKEN = process.env.GHN_TOKEN;
const CLIENT_ID = process.env.GHN_CLIENT_ID;
const SHOP_ID = process.env.GHN_SHOP_ID;

//[POST] /create (create shipping order)
export const createShippingOrder = async (req, res) => {
  const { order_id, weight, length, width, height } = req.body;
  try {
    //Query vào order để lấy các trường thông tin to_name ..., items..

    const currentOrder = await Order.findById(order_id).populate(
      "user products.product"
    );
    const { fullname, phone, address } = currentOrder.shippingDetail;
    const { province, district, ward, detail } = address;
    const serviceTypeId = currentOrder.serviceTypeId;

    let list = [];
    currentOrder.products.map((Element, index) => {
      let a = {};
      a.name = Element.product.name;
      a.code = Element.product.code;
      a.quantity = Element.quantity;
      a.price = Element.currentPrice;
      list.push(a);
    });

    const response = await axios.post(
      `${BASE_URL}${ROUTES.CREATE}`,
      {
        to_name: fullname,
        to_phone: phone,
        to_address: detail,
        to_ward_code: ward.wardId.toString(),
        to_district_name: district.districtId.toString(),
        to_province_name: province.provinceName,
        weight: parseInt(weight),
        length: parseInt(length),
        width: parseInt(width),
        height: parseInt(height),
        service_type_id: serviceTypeId,
        items: list,
        payment_type_id: 2,
        required_note: "CHOXEMHANGKHONGTHU",
      },
      {
        headers: {
          Token: TOKEN,
          ShopId: SHOP_ID,
        },
      }
    );

    //Cap nhat order code tra ve vao bang order, cap nhat status sang shipping
    const newOrder = await Order.findByIdAndUpdate(order_id, {
      $set: {
        shippingOrderCode: response.data.data.order_code,
        status: ORDER_STATUS.SHIPPING,
      },
    });

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      data: response.data.data,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[POST] /cancel (cancel shipping order)
export const cancelShippingOrder = async (req, res) => {
  const { order_id, order_codes } = req.body;
  try {
    const currentOrder = await Order.findById(order_id);

    if (
      !(
        currentOrder.status === "pending" ||
        currentOrder.status === "packing" ||
        currentOrder.status === "picking"
      )
    ) {
      return sendWarning(res, "Order is in irrevocable status!");
    }

    const response = await axios.post(
      `${BASE_URL}${ROUTES.CANCEL}`,
      {
        order_codes,
      },
      {
        headers: {
          Token: TOKEN,
          ShopId: SHOP_ID,
        },
      }
    );
    res.status(HTTP_STATUS.SUCCESS).json({
      message: "This is cancel shipping order",
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /detail (detail shipping order)
export const detailShippingOrder = async (req, res) => {
  try {
    res.status(HTTP_STATUS.SUCCESS).json({
      message: "This is detail shipping order",
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /available-services (get available services)
export const getAvailableServices = async (req, res) => {
  const { from_district, to_district } = req.query;

  try {
    const response = await axios.post(
      `${BASE_URL}${ROUTES.AVAILABLE_SERVICES}`,
      {
        from_district: parseInt(from_district),
        to_district: parseInt(to_district),
        shop_id: parseInt(SHOP_ID),
      },
      {
        headers: {
          Token: TOKEN,
        },
      }
    );

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      data: response.data.data,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /fee (get fee)
export const getFee = async (req, res) => {
  const {
    service_type_id,
    // insurance_value,
    // coupon,
    // from_district_id,
    // to_ward_code,
    to_district_id,
    weight,
    length,
    width,
    height,
    // cod_value,
  } = Object.assign({}, req.query);

  try {
    const response = await axios.post(
      `${BASE_URL}${ROUTES.FEE}`,
      {
        service_type_id: parseInt(service_type_id),
        // insurance_value: insurance_value === null ? 0: parseInt(insurance_value),
        coupon: null,
        from_district_id: 1493,
        // to_ward_code,
        to_district_id: parseInt(to_district_id),
        weight: parseInt(weight),
        length: parseInt(length),
        width: parseInt(width),
        height: parseInt(height),
        cod_value: 0,
      },
      {
        headers: {
          Token: TOKEN,
          shop_id: parseInt(SHOP_ID),
        },
      }
    );

    //normalize data
    const result = response.data.data;

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      data: {
        total: result.total,
        service_fee: result.service_fee,
        insurance_fee: result.insurance_fee,
        pick_station_fee: result.pick_station_fee,
        coupon_value: result.coupon_value,
        r2s_fee: result.r2s_fee,
      },
    });
  } catch (error) {
    sendError(res, error);
    console.log(error);
  }
};

//[GET] /province (get province)
export const getProvince = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL_V1}${ROUTES.PROVINCE}`, {
      headers: {
        Token: TOKEN,
      },
    });

    //normalize data
    const result = response.data.data.map((item) => {
      return {
        ProvinceID: item.ProvinceID,
        ProvinceName: item.ProvinceName,
        NameExtension: item.NameExtension,
        CanUpdateCOD: item.CanUpdateCOD,
        Status: item.Status,
      };
    });

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /district (get district)
export const getDistrict = async (req, res) => {
  const { province_id } = req.query;
  try {
    const response = await axios.get(`${BASE_URL_V1}${ROUTES.DISTRICT}`, {
      headers: {
        Token: TOKEN,
      },
      params: { province_id: province_id },
    });

    //normalize data
    const result = response.data.data.map((item) => {
      return {
        ProvinceID: item.ProvinceID,
        DistrictID: item.DistrictID,
        DistrictName: item.DistrictName,
        NameExtension: item.NameExtension,
        Code: item.Code,
        SupportType: item.SupportType,
        Status: item.Status,
      };
    });

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[GET] /ward (get ward)
export const getWard = async (req, res) => {
  const { district_id } = req.query;
  try {
    const response = await axios.get(`${BASE_URL_V1}${ROUTES.WARD}`, {
      headers: {
        Token: TOKEN,
      },
      params: { district_id: district_id },
    });

    //normalize data
    const result = response.data.data.map((item) => {
      return {
        DistrictID: item.DistrictID,
        WardCode: item.WardCode,
        WardName: item.WardName,
        NameExtension: item.NameExtension,
        SupportType: item.SupportType,
        Status: item.Status,
      };
    });

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    sendError(res, error);
  }
};
