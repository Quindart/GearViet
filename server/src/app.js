import express from "express";
import cors from "cors";
import path from "path";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import db from "./config/db/index.js";
import route from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

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

route(app);

export default app;
