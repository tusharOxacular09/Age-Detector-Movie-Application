import { combineReducers } from "@reduxjs/toolkit";
import loginPageEnabelingSlice from "../slices/loginPageSlice";
import signUpPageEnabelingSlice from "../slices/signUpPageSlice";
import forgotPasswordPageEnabelingSlice from "../slices/forgotPasswordPageSlice";
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
    loginPageEnabeled: loginPageEnabelingSlice.reducer,
    signUpPageEnabeled: signUpPageEnabelingSlice.reducer,
    forgotPasswordPageEnabeled: forgotPasswordPageEnabelingSlice.reducer,
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