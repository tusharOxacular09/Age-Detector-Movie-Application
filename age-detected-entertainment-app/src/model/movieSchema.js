const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Defining Schema
const movieSchema = new Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [Number],
  overview: String,
  poster_path: String,
  release_date: String,
  title: String,
  original_language: String,
});

// Defining Model
exports.movieDetailsModel = mongoose.model("movies", movieSchema);
