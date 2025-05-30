import {
  HTTP_STATUS,
  CLOUDINARY_PRODUCT_FOLDER,
  CLOUDINARY_AVATAR_FOLDER,
} from "../utils/constant.js";
import express from "express";
import { sendWarning, sendError } from "../utils/response.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";


export const upload = (req, res) => {
  const { folder } = req.body;
  uploadImage(req, res, folder);
};

const uploadImage = async (req, res, folder) => {
  try {
    const file = req.files;

    //Check file
    if (!file) return sendWarning(res, "No image found");

    const image = file.image;
    const extensionName = path.extname(image.name); // fetch the file extension
    const allowedExtension = [".png", ".jpg", ".jpeg"];

    //Check extensions
    if (!allowedExtension.includes(extensionName)) {
      return sendWarning(res, "Image extension is not supported");
    }

    //upload
    const response = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: folder,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    if (!response) return sendWarning(res, "Upload image failed");

    //Clear temp file
    const directory = "tmp";
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });

    //response
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      image: {
        url: response.url,
        public_id: response.public_id,
      },
    });
  } catch (error) {
    sendError(res, error);
  }
};

export const deleteImage = async (req, res) => {
  const { public_id } = req.body;
  try {
    const response = await cloudinary.uploader.destroy(public_id);

    if (response.result === "ok") {
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        message: "Delete image successfully",
      });
    } else {
      return sendWarning(res, "Delete image failed");
    }
  } catch (error) {
    sendError(res, error);
  }
};
