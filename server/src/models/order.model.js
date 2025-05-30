import mongoose from 'mongoose'
import { nanoid } from "nanoid"

const generateId = () => {
  const id = nanoid.customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return id();
};

const orderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      default: generateId,
    },
    shippingOrderCode: {
      type: String,
    },
    warehouseUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        currentPrice: {
          type: Number,
        },
      },
    ],
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending", //pending, assigned, picking, shipping, returning, returned, finished, canceled
      lowercase: true,
    },
    shippingDetail: {
      fullname: {
        type: String,
        required: true,
      },
      address: {
        province: {
          provinceId: Number,
          provinceName: String,
        },
        district: {
          districtId: Number,
          districtName: String,
        },
        ward: {
          wardId: String,
          wardName: String,
        },
        detail: String,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
    },
    paymentType: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "unpaid", //paid, unpaid (Da thanh toan, chua thanh toan)
    },
    transactionNo: {
      type: Number,
    },
    payDate: {
      type: Date,
    },
    serviceTypeId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
