const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

const getWarMovies = async (req, res) => {
  try {
    const WarMovies = await movieDetailsModel.find({ genre_ids: { $in: 37 } });
    const movieTitles = [];
    const myFilteredWarMovies = [];

    WarMovies.map((movies) => {
      if (!movieTitles.includes(movies.title)) {
        movieTitles.push(movies.title);
        myFilteredWarMovies.push(movies);
      }
    });

    if (WarMovies !== null) {
      return res.status(200).json({
        success: "OK",
        data: myFilteredWarMovies,
        msg: "Successfully Get War Movies.",
      });
    } else {
      return res.status(201).json({
        success: "Failed",
        data: [],
        msg: "Unable to  Get War Movies.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Falied", msg: error.message });
  }
};

module.exports = getWarMovies;
