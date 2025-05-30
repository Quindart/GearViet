import User from "../models/user.model.js";
import {
  HTTP_STATUS,
  randomPassword,
  setResetPassEmailContent,
} from "../utils/constant.js";
import CryptoJS from "crypto-js";
import jsonwebtoken from "jsonwebtoken";
import { sendWarning, sendError } from "../utils/response.js";
import nodemailer from "nodemailer";

//[POST] login
export const login = async (req, res) => {

  const { username, password, remember } = req.body;
  try {
    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("username password email role status");
    if (!user) {
      return sendWarning(res, "Invalid username or password");
    } else {
      const decryptedPassword = decryptPassword(user.password);

      //check password
      if (decryptedPassword !== password) {
        return sendWarning(res, "Invalid username or password");
      }

      //check user inactive
      if (user.status === "inactive") {
        return sendWarning(res, "Your account is inactive");
      }

      //handle remember me
      var token;
      if (remember === true) {
        token = jwtSign(user._id, true);
      } else {
        token = jwtSign(user._id);
      }

      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
          status: user.status,
        },
        token: token,
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

//[POST] register
export const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const encryptedPassword = encryptPassword(password);

    const newUser = await User.create({
      username: username.toLowerCase(),
      password: encryptedPassword.toString(),
      email,
    });

    const token = jwtSign(newUser._id);

    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        email: newUser.email,
        status: newUser.status,
      },
      token,
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[PUT] changePassword
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = req.user;

  try {
    //Check current password is correct
    if (decryptPassword(user.password) !== currentPassword)
      return sendWarning(res, "Your current password is incorrect");

    //update new password to user collection
    const encryptedPassword = encryptPassword(newPassword);
    const result = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password: encryptedPassword.toString(),
        },
      },
      { new: true }
    );

    if (!result) return sendWarning(res, "Update password failed");
    res.status(HTTP_STATUS.SUCCESS).json({
      success: true,
      status: 200,
      message: "Update password successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};

//[POST] resetPassword
export const resetPassword = async (req, res) => {
  const { email, username } = req.body;
  try {
    //Check username is Exist
    const isUserExist = await User.findOne({ username: username });
    if (!isUserExist) return sendWarning(res, "Username does not exist");

    //check email
    if (isUserExist.email !== email) return sendWarning(res, "Email wrong");

    //Send new password to user email
    const newPassword = randomPassword(16);

    //Set new Password to server
    const encryptedNewPassword = encryptPassword(newPassword);
    const result = await User.findByIdAndUpdate(
      isUserExist._id,
      {
        $set: {
          password: encryptedNewPassword.toString(),
        },
      },
      {
        new: true,
      }
    );

    if (!result) {
      return sendWarning(res, "Reset password failed");
    } else {
      //Send new password to email
      const mailContent = setResetPassEmailContent(username, newPassword);
      sendEmail(email, "Ecomx password reset", mailContent);

      //resturn result
      res.status(HTTP_STATUS.SUCCESS).json({
        success: true,
        status: 200,
        message:
          "Reset password successfully. Check your mailbox for new password",
      });
    }
  } catch (error) {
    sendError(res, error);
  }
};

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);
};

const decryptPassword = (password) => {
  return CryptoJS.AES.decrypt(
    password,
    process.env.PASSWORD_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};

const jwtSign = (id, remember = false) => {
  return jsonwebtoken.sign(
    {
      id: id,
    },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: remember ? "168h" : "24h",
    }
  );
};

const sendEmail = (email, subject, content) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MASTER_EMAIL,
      pass: process.env.MASTER_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.MASTER_EMAIL,
    to: email,
    subject: subject,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

