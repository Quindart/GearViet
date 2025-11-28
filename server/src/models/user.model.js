import mongoose from 'mongoose';
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true, // Allow null/undefined values to be non-unique
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    name: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
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
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email invalid!");
        }
      },
    },
    gender: {
      type: String,
      default: "none",
      lowercase: true,
    },
    avatar: {
      url: { type: String },
      public_id: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user", //mod, admin, user, owner
      lowercase: true,
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
export default mongoose.model("User", userSchema);
