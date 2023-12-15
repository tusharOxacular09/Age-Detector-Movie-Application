// Logout
const userLogout = async (req, res) => {
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

module.exports = userLogout;
