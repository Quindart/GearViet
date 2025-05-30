import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { upload, deleteImage } from "../controllers/upload.controller.js";
import checkRole from "../middlewares/roleHandler.js";
import { verifyToken } from "../middlewares/tokenHandler.js";
import { ROLE } from "../utils/constant.js";

const router = express.Router();


//Upload product image
router.post(
  "/",
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  upload
);

//Delete product image
router.delete(
  "/",
  verifyToken,
  checkRole([ROLE.OWNER, ROLE.ADMIN, ROLE.MOD]),
  deleteImage
);

export default router;
