import { combineReducers } from "@reduxjs/toolkit";
import actionMovieReducer from "../slices/movieSlicer/actionMovies";
import warMoviesReducer from "../slices/movieSlicer/warMovies";
import dramaMoviesReducer from "../slices/movieSlicer/dramaMovies";
import fantasyMoviesReducer from "../slices/movieSlicer/fantesyMovies";
import kidMoviesReducer from "../slices/movieSlicer/kidMovies";
import adultMoviesReducer from "../slices/movieSlicer/adultMovies";
import chatSectionReducer from "../slices/chatSectionSlice";
import userVerificationReducer from "../slices/userVerificationStatus";
import ageDetectorEnabelingReducer from "../slices/openAgeDetector";


const rootReducer = combineReducers({
    actionMovies: actionMovieReducer,
    warMovies: warMoviesReducer,
    dramaMovies: dramaMoviesReducer,
    fantesyMovies: fantasyMoviesReducer,
    kidMovies: kidMoviesReducer,
    adultMovies: adultMoviesReducer,
    chatSectionEnabeled: chatSectionReducer,
    userVerificationStatus: userVerificationReducer,
    ageDetectorEnabeled: ageDetectorEnabelingReducer,
})

export default rootReducer;