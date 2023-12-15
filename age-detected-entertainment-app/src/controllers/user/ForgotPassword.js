const bcrypt = require("bcrypt");
const saltRounds = 10;
const model = require("../../model/userSchema");
const userDetailsModel = model.userDetailsModel;
const nodemailer = require("nodemailer");

// Forgot Password
let tempOTP = null;

// Step-1: Send OTP for Gmail Verification
exports.sendOTP = async (req, res) => {
  const OtpGenerator = Math.floor(100000 + Math.random() * 900000);
  tempOTP = OtpGenerator;
  setTimeout(() => {
    tempOTP = null;
  }, 120000);
  try {
    const { email } = req.body;

    // Checking The User is Exists Or Not
    const user = await userDetailsModel.findOne({ email });
    if (user === null) {
      return res.status(201).json({
        status: "failed",
        data: [],
        msg: "This Email is not registered.",
      });
    }

    // Gmail Configuration for sending The OTP
    let config = {
      service: "gmail",
      auth: {
        user: process.env.OXACULAR_EMAIL,
        pass: process.env.OXACULAR_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    const message = {
      from: "OXACULAR <noreply@gmail.com>",
      to: email,
      subject: "One Time Password",
      html: `
         <div>
            <h2>Message From OXACULAR</h2>
            <h3>One Time Password<h3>
            <br/>
            <h3>OTP - <span style='font-weight:bold;'>${OtpGenerator}</span></h3>
            <br/>
            <p>Please Fill This OTP in Our Application.</p>
         </div>
      `,
    };
    // send mail with defined transport object
    await transporter
      .sendMail(message)
      .then(() =>
        res.status(200).json({
          msg: "you should receive an email from OXACULAR!",
        })
      )
      .catch((error) => res.status(400).json({ ErrorMessage: error.message }));
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", msg: "Internal Server Error" });
  }
};

// Step-2: Verify OTP from user
exports.verifyOTP = (req, res) => {
  const { otp } = req.body;
  if (parseInt(otp) === tempOTP) {
    res.status(200).json({ msg: "OTP Verification Successful." });
  } else {
    res.status(201).json({ msg: "Invalid OTP Verification." });
  }
};

// Step-3: Reset Password
exports.resetPassword = async (req, res) => {
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
};
