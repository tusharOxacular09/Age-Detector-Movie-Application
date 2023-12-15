const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

const getDramaMovies = async (req, res) => {
  try {
    const DramaMovies = await movieDetailsModel.find({
      $and: [{ genre_ids: { $in: 18 } }, { genre_ids: { $in: 80 } }],
    });

    const movieTitles = [];
    const myFilteredDramaMovies = [];

    DramaMovies.map((movies) => {
      if (!movieTitles.includes(movies.title)) {
        movieTitles.push(movies.title);
        myFilteredDramaMovies.push(movies);
      }
    });

    if (DramaMovies !== null) {
      return res.status(200).json({
        success: "OK",
        data: myFilteredDramaMovies,
        msg: "Successfully Get Drama Movies.",
      });
    } else {
      return res.status(201).json({
        success: "Failed",
        data: [],
        msg: "Unable to  Get Drama Movies.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Falied", msg: error.message });
  }
};

module.exports = getDramaMovies;
