import User from "../models/user.model.js";
import moment from "moment";
import {
  sendWarning,
  sendError,
  sendUnauthenticated,
} from "../utils/response.js";
import { HTTP_STATUS, ROLE } from "../utils/constant.js";

//getAllUser
export const getAllUser = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const users = await User.find({ _id: { $ne: process.env.MASTER_ADMIN_ID } })
      .select("username name address phone email gender avatar role status")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalRows = await User.countDocuments({
      _id: { $ne: process.env.MASTER_ADMIN_ID },
    });

    if (!users) sendWarning(res, "Get list user failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      users,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//getUserById
export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    //if user is normal user, mod user, can get yourself only
    // if user is admin, mod, can get any user
    if (req.user.role !== ROLE.ADMIN && req.user._id.toString() !== userId)
      return sendWarning(res, "You can't access this resource");

    const user = await User.find({ _id: userId }).select(
      "username name address phone email gender avatar role status"
    );

    if (!user) sendWarning(res, "Get user failed");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      user: user[0],
    });
  } catch (error) {
    sendError(res, error);
  }
};

//get total user by time
export const getTotalUserByTime = async (req, res) => {
  const { limit } = Object.assign({}, req.query);
  try {
    let query = {
      createdAt: {
        $lte: moment().toDate(),
        $gte: moment().subtract(1, limit).toDate(),
      },
    };
    const total = await User.find(query).count();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      total,
    });
  } catch (error) {
    sendError(res, error);
  }
};
//get user detail
export const getUserDetail = (req, res) => {
  const { user } = req;

  if (user.status !== "active")
    return sendUnauthenticated(res, "User is blocked");

  res.status(HTTP_STATUS.SUCCESS).json({
    success: true,
    status: 200,
    user: {
      _id: user._id,
      username: user.username,
      name: user.name,
      address: user.address,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
    },
  });
};

//Edit user, active, deactive
export const editUser = async (req, res) => {
  const { userId } = req.params;
  const { name, address, phone, email, gender, avatar, role, status } =
    req.body;

  try {
    //if user is normal user, mod user, can edit yourself only
    // if user is admin, mod, can edit any user
    if (
      req.user.role === ROLE.OWNER ||
      req.user.role === ROLE.ADMIN ||
      req.user._id.toString() === userId
    ) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            name,
            address,
            phone,
            email,
            gender,
            avatar,
          },
        },
        { new: true }
      ).select("username name address phone email gender avatar role status");

      if (!updatedUser) sendWarning(res, "Update user failed");

      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        user: updatedUser,
      });
    } else {
      return sendWarning(res, "You can't access this resource");
    }
  } catch (error) {
    sendError(res, error);
  }
};

//Update user Role and status
export const changeRoleAndStatus = async (req, res) => {
  const { userId } = req.params;
  const { role, status } = req.body;

  try {
    //if current user is not owner role, cant edit user has role admin
    const loggedUser = req.user;
    const currentUser = await User.findById(userId);

    if (role === ROLE.OWNER) return sendWarning(res, "Invalid role");
    if (loggedUser.role !== ROLE.OWNER && currentUser.role === ROLE.ADMIN)
      return sendWarning(res, "You can't update user have admin role");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          role,
          status,
        },
      },
      { new: true }
    ).select("username role status");

    if (!updatedUser) sendWarning(res, "Update role failed");

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      username: updatedUser.username,
      role: updatedUser.role,
      userStatus: updatedUser.status,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//Search user
export const searchUser = async (req, res) => {
  const { username, name, email, page, limit } = Object.assign({}, req.query);

  const regex = {
    username: {
      $regex: username ? username : "",
      $options: "i",
    },
    email: {
      $regex: email ? email : "",
      $options: "i",
    },
    _id: {
      $ne: process.env.MASTER_ADMIN_ID,
    },
  };

  const nameRegex = {
    name: {
      $regex: name ? name : "",
      $options: "i",
    },
  };

  try {
    const users = await User.find(name ? nameRegex : regex)
      .select("username name address phone email gender avatar role status")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await User.find(name ? nameRegex : regex).count();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      users,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//filter user
export const filterUser = async (req, res) => {
  const { page, limit } = Object.assign({}, req.query);
  const { role, status } = Object.assign({}, req.query);
  var query = {};
  if (role !== undefined) query["role"] = role;
  if (status !== undefined) query["status"] = status;

  try {
    const users = await User.find(query)
      .select("username name address phone email gender avatar role status")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalRows = await User.find(query).count();

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      totalRows,
      users,
    });
  } catch (error) {
    sendError(res, error);
  }
};

