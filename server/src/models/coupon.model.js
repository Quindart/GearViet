import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    available: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "active",
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Coupon", couponSchema);
