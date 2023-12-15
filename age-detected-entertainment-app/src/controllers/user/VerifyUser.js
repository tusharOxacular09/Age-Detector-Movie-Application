const jwt = require("jsonwebtoken");

// Verify User
const verifyUser = (req, res) => {
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

module.exports = verifyUser;
