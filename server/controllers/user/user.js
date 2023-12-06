const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const model = require("../../model/userSchema");
const userDetailsModel = model.userDetailsModel;

// Register
exports.userSignUp = async (req, res) => {
  const userData = req.body;
  try {
    const existingUser = await userDetailsModel.findOne({
      email: userData.email,
    });
    if (existingUser)
      return res.status(201).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    // Password encryption and bcryption
    bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(400).send({ Error: "Error for hashing password" });
      }
      const HashedUserData = { ...userData, password: hash };
      const newUser = await new userDetailsModel(HashedUserData);
      await newUser
        .save()
        .then((result) => {
          if (result) {
            return res.status(200).send({
              msg: "Thank you for registering with us. Your account has been successfully created.",
            });
          }
        })
        .catch((err) => res.status(400).send({ msg: err.message }));
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ msg: error.message });
  }
};

// Login
exports.userLogin = async (req, res) => {
  const userData = req.body;
  try {
    const userFromDB = await userDetailsModel.findOne({
      email: userData.email,
    });
    if (userFromDB !== null) {
      // comparing the password
      await bcrypt.compare(
        `${userData["password"]}`,
        userFromDB["password"],
        (error, response) => {
          if (error) {
            console.log(error);
            return res.status(400).json({ msg: "Error in Logging the user." });
          } else if (response) {
            // creating session and token
            const userEmail = userFromDB["email"];
            const token = jwt.sign({ userEmail }, process.env.JWT_KEY, {
              expiresIn: "1d",
            });

            // setting up the cookie
            res.cookie("token", token);

            res.status(200).json({ msg: "User LoggedIn Successfully" });
          } else {
            return res.status(201).send({ msg: "Password Didn't match." });
          }
        }
      );
    } else {
      return res.status(201).json({ msg: "The User is not exists." });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }
};

// Verify User
exports.verifyUser = (req, res) => {
  try {
    const userToken = req.cookies.token;
    if (!userToken) {
      return res.status(201).json({ Error: "You are not logged in" });
    } else {
      jwt.verify(userToken, process.env.JWT_KEY, (err, decode) => {
        if (err) {
          return res.status(201).json({ Error: "Token is not okay" });
        } else {
          req.email = decode.email;
          return res.status(200).json({
            Status: "Success",
            email: req.email,
            msg: "User Verified Successfully.",
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: "false", msg: error.message });
  }
};

// Logout
exports.userLogout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res
      .status(200)
      .json({ Status: "Success", msg: "Successfully Logout." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: "false", msg: error.message });
  }
};

// Forgot Password
exports.userForgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDetailsModel.findOne({ email });
    if (user === null) {
      return res.status(201).json({
        status: "failed",
        data: [],
        msg: "This Email is not registered.",
      });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(201).send({ Error: "Error for hashing password" });
      }
      user.password = hash;
      await user
        .save()
        .then((response) => {
          if (response) {
            res
              .status(200)
              .json({ status: "OK", msg: "Password updated successfully" });
          }
        })
        .catch((err) =>
          res.status(400).json({ status: "failed", msg: err.message })
        );
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", msg: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userDetails = await userDetailsModel.findOne({email: userEmail});
    if (userDetails !== null) {
      const { _id, email, age, dob, } = userDetails;
    res.status(200).json({ userDetails: { _id, email, age, dob } });
    } else {
      res.status(201).json({success: "Failed", msg: "User Doesn't Exists"});
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({success: "Failed", msg: error.message});
  }
}