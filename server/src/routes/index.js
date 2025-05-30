import express from "express";

import auth from "./auth.route.js";
import user from "./user.route.js";
import product from "./product.route.js";
import category from "./category.route.js";
import upload from "./upload.route.js";
import order from "./order.route.js";
import coupon from "./coupon.route.js";
import comment from "./comment.route.js";
import review from "./review.route.js";
import shipping from "./shipping.route.js";
import payment from "./payment.route.js";
import { ROUTES } from "../utils/routes.js";


function router(app) {
  app.use(ROUTES.AUTH, auth);
  app.use(ROUTES.CATEGORY, category);
  app.use(ROUTES.COMMENT, comment);
  app.use(ROUTES.COUPON, coupon);
  app.use(ROUTES.ORDER, order);
  app.use(ROUTES.PRODUCT, product);
  app.use(ROUTES.REVIEW, review);
  app.use(ROUTES.UPLOAD, upload);
  app.use(ROUTES.USER, user);
  app.use(ROUTES.SHIPPING, shipping);
  app.use(ROUTES.PAYMENT, payment);
}

export default router;
