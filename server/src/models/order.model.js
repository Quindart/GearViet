import mongoose from 'mongoose'
import { customAlphabet } from "nanoid"

const generateId = () => {
  const id = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
  return id();
};

const orderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      default: generateId,
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending", //pending, confirmed, processing, shipping, completed, canceled
      lowercase: true,
    },
    customerInfo: {
      fullname: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
        required: true,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
