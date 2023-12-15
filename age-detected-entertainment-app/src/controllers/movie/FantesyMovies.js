const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

const getFantesyMovies = async (req, res) => {
  try {
    const FantesyMovies = await movieDetailsModel.find({
      genre_ids: { $in: 14 },
    });

    const movieTitles = [];
    const myFilteredFantesyMovies = [];

    FantesyMovies.map((movies) => {
      if (!movieTitles.includes(movies.title)) {
        movieTitles.push(movies.title);
        myFilteredFantesyMovies.push(movies);
      }
    });

    if (FantesyMovies !== null) {
      return res.status(200).json({
        success: "OK",
        data: myFilteredFantesyMovies,
        msg: "Successfully Get Fantesy Movies.",
      });
    } else {
      return res.status(201).json({
        success: "Failed",
        data: [],
        msg: "Unable to  Get Fantesy Movies.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Falied", msg: error.message });
  }
};

module.exports = getFantesyMovies;
