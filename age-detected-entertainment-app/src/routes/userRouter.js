const express = require("express");
const forgotPassword = require("../controllers/user/ForgotPassword");
const userRegister = require("../controllers/user/userRegister");
const userLogin = require("../controllers/user/userLogin");
const verifyUser = require("../controllers/user/VerifyUser");
const userLogout = require("../controllers/user/userLogout");
const userDetails = require("../controllers/user/userDetails");
const router = express.Router();
const model = require("../model/userSchema");
const userDetailsModel = model.userDetailsModel;

// This is a middleware which checks the user is previously exists or not
const checkUserExistance = async (req, res, next) => {
  const { email } = req.body;
  const user = await userDetailsModel.findOne({
    email: email,
  });
  if (user) {
    return res.status(201).json({
      status: "failed",
      msg: "It seems you already have an account, please log in instead.",
    });
  } else {
    next();
  }
};

router
  .post("/register", userRegister.userRegister)
  .post("/verify-email", checkUserExistance, userRegister.verifyEmail)
  .post("/login", userLogin)
  .get("/verify-user", verifyUser)
  .get("/logout", userLogout)
  .post("/send-otp", forgotPassword.sendOTP)
  .post("/verify-otp", forgotPassword.verifyOTP)
  .patch("/reset-password", forgotPassword.resetPassword)
  .get("/get-user-details/:email", userDetails);

module.exports = router;
