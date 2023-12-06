const express = require("express");
const movieController = require("../controllers/movie/movie");
const router = express.Router();

router
  .get("/action-movies", movieController.getActionMovies)
  .get("/adult-movies", movieController.getAdultMovies)
  .get("/kids-movies", movieController.getKidsMovies)
  .get("/war-movies", movieController.getWarMovies)
  .get("/drama-movies", movieController.getDramaMovies)
  .get("/fantesy-movies", movieController.getFantesyMovies);

module.exports = router;
