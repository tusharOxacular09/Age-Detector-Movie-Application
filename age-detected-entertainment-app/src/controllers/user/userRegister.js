const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const saltRounds = 10;
const model = require("../../model/userSchema");
const userDetailsModel = model.userDetailsModel;

// Temporary OTP four Email Verification
let tempOTP = null;

exports.verifyEmail = async (req, res) => {
  const OtpGenerator = Math.floor(100000 + Math.random() * 900000);
  tempOTP = OtpGenerator;
  setTimeout(() => {
    tempOTP = null;
  }, 120000);
  const { email } = req.body;
  try {
    // Gmail Configuration for sending The OTP
    // For Verification of Gmail Account
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
    console.log(error.message);
    return res.status(400).send({ msg: error.message });
  }
};

// Register
exports.userRegister = async (req, res) => {
  // const user
  const userData = req.body;
  const otp = userData.otp;
  try {
    if (parseInt(otp) === tempOTP) {
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
    } else {
      res.status(201).json({ msg: "OTP didn't match" });
    }
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};
