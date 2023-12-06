const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Defining Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: "Your email is required",
    unique: true,
    lowercase: true,
    trim: true,
  },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
});

// Defining Model
exports.userDetailsModel = mongoose.model("userDetailsModel", userSchema);
