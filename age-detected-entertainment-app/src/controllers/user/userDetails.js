const model = require("../../model/userSchema");
const userDetailsModel = model.userDetailsModel;

const userDetails = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userDetails = await userDetailsModel.findOne({ email: userEmail });
    if (userDetails !== null) {
      const { _id, email, age, dob, subscribed } = userDetails;
      res
        .status(200)
        .json({ userDetails: { _id, email, age, dob, subscribed } });
    } else {
      res.status(201).json({ success: "Failed", msg: "User Doesn't Exists" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Failed", msg: error.message });
  }
};

module.exports = userDetails;
