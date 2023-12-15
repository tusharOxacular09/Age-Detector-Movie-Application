const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

const getActionMovies = async (req, res) => {
  try {
    const ActionMovies = await movieDetailsModel.find({
      $and: [{ genre_ids: { $in: 28 } }, { genre_ids: { $in: 53 } }],
    });

    // The Best way to filter out the data is by using aggregate functions.
    // Here I am filtering it manually using simple Javascript.

    const movieTitles = [];
    const myFilteredActionMovies = [];

    ActionMovies.map((movies) => {
      if (!movieTitles.includes(movies.title)) {
        movieTitles.push(movies.title);
        myFilteredActionMovies.push(movies);
      }
    });

    if (ActionMovies !== null) {
      return res.status(200).json({
        success: "OK",
        data: myFilteredActionMovies,
        msg: "Successfully Get Action Movies.",
      });
    } else {
      return res.status(201).json({
        success: "Failed",
        data: [],
        msg: "Unable to  Get Action Movies.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Falied", msg: error.message });
  }
};

module.exports = getActionMovies;
