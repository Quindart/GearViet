import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

import db from "./config/db/index.js";
import route from "./routes/index.js";
import auth from "./routes/auth.route.js";
import user from "./routes/user.route.js";
import product from "./routes/product.route.js";
import category from "./routes/category.route.js";
import upload from "./routes/upload.route.js";
import comment from "./routes/comment.route.js";
import coupon from "./routes/coupon.route.js";
import order from "./routes/order.route.js";
import payment from "./routes/payment.route.js";
import review from "./routes/review.route.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT
const BASE_URL = process.env.BASE_URL

const app = express()

db.connect();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
        abortOnLimit: true,
    })
);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Mount routes under /api prefix
app.use("/api/auth", auth);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/upload", upload);
app.use("/api/user", user);
app.use("/api/comment", comment);
app.use("/api/coupon", coupon);
app.use("/api/order", order);
app.use("/api/payment", payment);
app.use("/api/review", review);

// Old route function (for backward compatibility)
route(app);

app.listen(PORT, () => console.log(`Server listening at ${BASE_URL}:${PORT}`));