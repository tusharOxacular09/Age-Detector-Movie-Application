const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

const getKidsMovies = async (req, res) => {
  try {
    const KidsMovies = await movieDetailsModel.find({ genre_ids: { $in: 16 } });
    // The Best way to filter out the data is by using aggregate functions.
    // Here I am filtering it manually using simple Javascript.
    const movieTitles = [];
    const myFilteredKidMovies = [];

    KidsMovies.map((movies) => {
      if (!movieTitles.includes(movies.title)) {
        movieTitles.push(movies.title);
        myFilteredKidMovies.push(movies);
      }
    });

    if (KidsMovies !== null) {
      return res.status(200).json({
        success: "OK",
        data: myFilteredKidMovies,
        msg: "Successfully Get Kids Movies.",
      });
    } else {
      return res.status(201).json({
        success: "Failed",
        data: [],
        msg: "Unable to  Get Kids Movies.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Falied", msg: error.message });
  }
};

module.exports = getKidsMovies;
