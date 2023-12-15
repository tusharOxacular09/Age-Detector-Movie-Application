const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

const getAdultMovies = async (req, res) => {
  try {
    const AdultMovies = await movieDetailsModel.find({
      genre_ids: { $in: 10749 },
    });

    const movieTitles = [];
    const myFilteredAdultMovies = [];

    AdultMovies.map((movies) => {
      if (!movieTitles.includes(movies.title)) {
        movieTitles.push(movies.title);
        myFilteredAdultMovies.push(movies);
      }
    });

    if (AdultMovies !== null) {
      return res.status(200).json({
        success: "OK",
        data: myFilteredAdultMovies,
        msg: "Successfully Get Adult Movies.",
      });
    } else {
      return res.status(201).json({
        success: "Failed",
        data: [],
        msg: "Unable to  Get Adult Movies.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Falied", msg: error.message });
  }
};

module.exports = getAdultMovies;
