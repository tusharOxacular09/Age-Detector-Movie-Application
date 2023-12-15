const model = require("../../model/userSchema");
const userDetailsModel = model.userDetailsModel;

const updateUserPaymentStatus = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userDetailsModel.findOne({ email });
    if (user === null) {
      return res.status(201).json({
        status: "failed",
        data: [],
        msg: "This Email is not registered.",
      });
    }
    user.subscribed = true;
    await user
      .save()
      .then((response) => {
        if (response) {
          res
            .status(200)
            .json({
              status: "OK",
              msg: "Welcome! Now you are a member of OXACULAR.",
            });
        }
      })
      .catch((err) =>
        res.status(400).json({ status: "failed", msg: err.message })
      );
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = updateUserPaymentStatus;
