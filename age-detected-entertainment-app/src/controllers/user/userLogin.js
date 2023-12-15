const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../../model/userSchema");
const userDetailsModel = model.userDetailsModel;

// User Login
const userLogin = async (req, res) => {
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

module.exports = userLogin;
