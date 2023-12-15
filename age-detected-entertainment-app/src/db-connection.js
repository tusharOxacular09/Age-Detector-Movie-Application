const mongoose = require("mongoose");

const DatabaseConnector = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Database is connected.");
};

module.exports = { DatabaseConnector };
