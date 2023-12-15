import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { userVerificationSliceAction } from "./redux/slices/userVerificationStatus";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import Adults from "./components/categories/Adults";
import Kids from "./components/categories/Kids";
import Actions from "./components/categories/Actions";
import Documentations from "./components/categories/Documentations";
import NavBar from "./components/navigation/NavBar";
import MovieDetailsPage from "./components/movie-section/MovieDetailsPage";
import WebcamComponent from "./components/web-Camera/WebcamComponent";
import NotFound from "./components/page-not-found/NotFound";
import PaymentDetails from "./components/stripe-payment/PaymentDetails";
import PaymentSuccess from "./components/stripe-payment/PaymentSuccess";
import StripeCheckout from "./components/stripe-payment/StripeCheckout";

function App() {
  // This is mandatory for accessing and handeling the cookies.
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const ageDetectorEnabeled = useSelector(
    (state) => state.ageDetectorEnabeled.ageDetectorEnabeled
  );

  // Authentication Details
  const [pageEnabelingStatus, setPageEnabelingStatus] = useState({
    loginPageEnabeled: false,
    signUpPageEnabeled: false,
    forgotPasswordPageEnabeled: false,
  });

  // Validating the User
  const VerifyingUser = async () => {
    try {
      await axios
        .get("http://localhost:8080/api/user/verify-user")
        .then((res) => {
          if (res.status === 201) {
            dispatch(userVerificationSliceAction.disabelingUserVerification());
          } else if (res.status === 200) {
            dispatch(userVerificationSliceAction.enabelingUserVerification());
          } else {
            dispatch(userVerificationSliceAction.disabelingUserVerification());
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    VerifyingUser();
  });

  return (
    <div>
      <NavBar setPageEnabelingStatus={setPageEnabelingStatus} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              setPageEnabelingStatus={setPageEnabelingStatus}
              pageEnabelingStatus={pageEnabelingStatus}
            />
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/action" element={<Actions />} />
        <Route path="/adult" element={<Adults />} />
        <Route path="/docs" element={<Documentations />} />
        <Route path="/movie-details" element={<MovieDetailsPage />} />
        <Route path="/subscription" element={<PaymentDetails />} />
        <Route path="/payment-checkout" element={<StripeCheckout />} />
        <Route
          path={`/oxcaular/payment-success/`}
          element={<PaymentSuccess />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {ageDetectorEnabeled && <WebcamComponent />}
      <ToastContainer />
    </div>
  );
}

export default App;
