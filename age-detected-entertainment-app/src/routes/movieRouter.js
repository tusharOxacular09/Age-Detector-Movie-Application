const express = require("express");
const router = express.Router();
const getActionMovies = require("../controllers/movie/ActionMovies");
const getKidsMovies = require("../controllers/movie/KidsMovies");
const getWarMovies = require("../controllers/movie/WarMovies");
const getAdultMovies = require("../controllers/movie/AdultMovies");
const getDramaMovies = require("../controllers/movie/DramaMovies");
const getFantesyMovies = require("../controllers/movie/FantesyMovies");

router
  .get("/action-movies", getActionMovies)
  .get("/adult-movies", getAdultMovies)
  .get("/kids-movies", getKidsMovies)
  .get("/war-movies", getWarMovies)
  .get("/drama-movies", getDramaMovies)
  .get("/fantesy-movies", getFantesyMovies);

module.exports = router;
