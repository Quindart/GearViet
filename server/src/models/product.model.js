import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    code: {
      // ma san pham
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    images: [
      {
        url: { type: String },
        public_id: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      // default: 1,
      required: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: Array,
      lowercase: true,
    },
    brand: {
      type: String,
      lowercase: true,
    },
    selling: {
      type: Number,
      default: 0,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    avg_review: {
      type: Number,
    },
    totalComment: {
      type: Number,
    },

    width: {
      type: Number,
    },
    length: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
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

export default mongoose.model("Product", productSchema);
