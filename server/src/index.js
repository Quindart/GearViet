import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import db from "./config/db/index.js";
import route from "./routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || "http://localhost";

const app = express();

db.connect();

app.get('/api/*', (req, res) => {
    res.json({ message: 'API is working' });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static(path.join(__dirname, "public")));

route(app);

app.listen(PORT, () => {
    console.log(`Server is running at ${BASE_URL}:${PORT}`);
});
