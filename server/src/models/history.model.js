import mongoose from 'mongoose'

const historySchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          name: String,
          code: String,
          price: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    coupon: {
      code: String,
      discount: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingDetail: {
      fullname: {
        type: String,
        required: true,
      },
      address: {
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
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("History", historySchema);
