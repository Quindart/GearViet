export const HTTP_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHENTICATED: 401,
  UNAUTHORIZED: 403,
  GEN_UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_TEMPORARILY_OVERLOADED: 502,
  SERVICE_UNAVAILABLE: 503,
  CONFLICT: 409,
  TOO_MANY_REQUEST: 429,
};

export const ROLE = {
  OWNER: "owner",
  ADMIN: "admin",
  MOD: "mod",
  WAREHOUSE: "warehouse",
  USER: "user",
};

export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const DATE = {
  DAYS: "days",
  WEEKS: "weeks",
  MONTHS: "months",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  ASSIGNED: "assigned",
  PICKING: "picking",
  SHIPPING: "shipping",
  RETURNING: "returning",
  RETURNED: "returned",
  FINISHED: "finished",
  CANCELED: "canceled",
};

export const REVIEW_SCORE = [1, 2, 3, 4, 5];

//Production
export const UNCATEGORY_ID = "63fecafc2dbbd8fd9d9b5395";
export const UNSUBCATEGORY_ID = "63fecb022dbbd8fd9d9b539d";

//Test
// export const  UNCATEGORY_ID = "63a3423f6ee0fc6c0e1337e1";
// export const  UNSUBCATEGORY_ID = "63b18c4a8096e40d964468ce";

export const CLOUDINARY_PRODUCT_FOLDER = "products";
export const CLOUDINARY_AVATAR_FOLDER = "avatar";

export const setResetPassEmailContent = (username, newPassword) => {
  return `Your new password for user ${username} in Ecomx system is: \n ${newPassword} \n If you did not request to reset your password, it is safe to disregard this message. You can learn more about why you may have received this email here.\n
  Best regards, \n
  The Ecomx Team`;
};

export const randomPassword = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
