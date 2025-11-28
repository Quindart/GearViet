import express from "express";

import auth from "./auth.route.js";
import user from "./user.route.js";
import product from "./product.route.js";
import category from "./category.route.js";
import upload from "./upload.route.js";
import comment from "./comment.route.js";
import { ROUTES } from "../utils/routes.js";


function router(app) {
  app.use(ROUTES.AUTH, auth);
  app.use(ROUTES.CATEGORY, category);
  app.use(ROUTES.PRODUCT, product);
  app.use(ROUTES.UPLOAD, upload);
  app.use(ROUTES.USER, user);
  app.use(ROUTES.COMMENT, comment);
}

export default router;
