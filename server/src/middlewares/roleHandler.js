import { tokenDecode } from "./tokenHandler.js";
import User from "../models/user.model.js";
import { HTTP_STATUS } from "../utils/constant.js";


export const checkRole = (acceptableRole) => {
  return async (req, res, next) => {
    try {
      const tokenDecoded = await tokenDecode(req);
      if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if (!user)
          return res
            .status(HTTP_STATUS.UNAUTHENTICATED)
            .json("Unauthenticated");
        if (acceptableRole.includes(user.role)) {
          next();
          return;
        } else {
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json("You cant access this resource");
        }
      }
    } catch (error) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json("Unauthorized");
    }
  };
};

export default checkRole;
