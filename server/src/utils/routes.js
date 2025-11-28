export const ROUTES = {
  //Search
  SEARCH: "/search",
  FILTER: "/filter",

  //Auth
  AUTH: "/auth",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot",
  CHANGE_PASSWORD: "/password/change",

  //Category
  CATEGORY: "/category",
  CATEGORY_BY_ID: "/:categoryId",
  SUBCATEGORY: "/subcategory",
  SUBCATEGORY_BY_ID: "/subcategory/:subcategoryId",



  //Product
  PRODUCT: "/product",
  PRODUCT_ADMIN: "/admin",
  PRODUCT_BY_ID: "/:productId",
  PRODUCT_BY_SUBCATEGORY: "/subcategory/:subcategoryId",
  TOTAL_PRODUCT_TIME: "/total",
  BRAND: "/brand",
  CHECK_BRAND: "/brand/check",
  NEWEST_PRODUCT: "/newest",
  BEST_SELLING_PRODUCT: "/best-selling",
  CHANGE_PRODUCT_STATUS: "/status/:productId",
  CHECK_PRODUCT_CODE: "/check-upc",


  //Upload
  UPLOAD: "/upload",

  //User
  USER: "/user",
  TOTAL_USER_BY_TIME: "/total",
  USER_BY_ID: "/:userId",
  USER_DETAIL: "/detail",
  CHANGE_USER_ROLE_AND_STATUS: "/change/:userId",

  //Order
  ORDER: "/order",
  ORDER_BY_ID: "/:orderId",
  ORDER_BY_USER_ID: "/user/:userId",
  TOTAL_ORDER_BY_TIME: "/total",
  TOTAL_REVENUE: "/revenue",
  TOTAL_REVENUE_BY_PRODUCT_ID: "/revenue/:productId",

  //Coupon
  COUPON: "/coupon",
  COUPON_BY_ID: "/:couponId",

  //Review
  REVIEW: "/review",
  REVIEW_BY_ID: "/:reviewId",
  REVIEW_BY_PRODUCT_ID: "/product/:productId",

  //Payment
  CREATE_PAYMENT_URL: "/create",
  PAYMENT_SUCCESS: "/success",
};
