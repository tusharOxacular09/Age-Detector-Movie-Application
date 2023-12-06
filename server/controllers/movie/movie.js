const model = require("../../model/movieSchema");
const movieDetailsModel = model.movieDetailsModel;

exports.getActionMovies = async (req, res) => {
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

exports.getAdultMovies = async (req, res) => {
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

exports.getKidsMovies = async (req, res) => {
  try {
    const KidsMovies = await movieDetailsModel.find({ genre_ids: { $in: 16 } });

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

exports.getWarMovies = async (req, res) => {
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

exports.getDramaMovies = async (req, res) => {
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

exports.getFantesyMovies = async (req, res) => {
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
