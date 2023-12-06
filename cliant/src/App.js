import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage";
import Adults from "./components/categories/Adults";
import Kids from "./components/categories/Kids";
import Actions from "./components/categories/Actions";
import Documentations from "./components/categories/Documentations";
import NavBar from "./components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieDetailsPage from "./components/MovieDetailsPage";
import { userVerificationSliceAction } from "./redux/slices/userVerificationStatus";
import WebcamComponent from "./components/web-Camera/WebcamComponent";
import { useSelector, useDispatch } from "react-redux";

function App() {
  // This is mandatory for accessing and handeling the cookies.
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ageDetectorEnabeled = useSelector(
    (state) => state.ageDetectorEnabeled.ageDetectorEnabeled
  );

  // Validating the User
  const VerifyingUser = async () => {
    try {
      const validateUser = await axios.get(
        "http://localhost:8080/api/user/verify-user"
      );
      if (validateUser.status !== 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    VerifyingUser();
    dispatch(
      userVerificationSliceAction.disabelingUserVerificationForAdultMovies()
    );
  });

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/action" element={<Actions />} />
        <Route path="/adult" element={<Adults />} />
        <Route path="/docs" element={<Documentations />} />
        <Route path="/movie-details" element={<MovieDetailsPage />} />
      </Routes>
      {ageDetectorEnabeled && <WebcamComponent />}
      <ToastContainer />
    </div>
  );
}

export default App;
