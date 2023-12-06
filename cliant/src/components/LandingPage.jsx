import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { loginPageEnabelingSliceAction } from "../redux/slices/loginPageSlice";
import SignUpPage from "./SignUpPage";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // This Line is mandatory for saving the cookies in the browser.
  axios.defaults.withCredentials = true;
  const loginPageEnabeled = useSelector(
    (state) => state.loginPageEnabeled.loginPageEnabeled
  );
  const signUpPageEnabeled = useSelector(
    (state) => state.signUpPageEnabeled.signUpPageEnabeled
  );
  const forgotPasswordPageEnabeled = useSelector(
    (state) => state.forgotPasswordPageEnabeled.forgotPasswordPageEnabeled
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifying The User By Calling The API
    const checkVerifiedUser = async () => {
      try {
        const isUserVerifified = await axios.get(
          "http://localhost:8080/api/user/verify-user"
        );
        if (isUserVerifified.status === 200) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    checkVerifiedUser();
  }, [navigate]);

  return (
    <div className="bg-landing_page_bg h-full w-full bg-top absolute left-0 right-0 top-0 bottom-0 z-minus-1 bg-cover bg-no-repeat flex items-center justify-center">
      <div
        className={`w-1/3 max-lg:w-1/2 max-sm:w-full max-sm:px-6 flex flex-col items-center justify-center ${
          (loginPageEnabeled ||
            signUpPageEnabeled ||
            forgotPasswordPageEnabeled) &&
          "hidden"
        }`}
      >
        <img src="/assets/images/cta-logo-one.svg" alt="" />
        <button
          onClick={() =>
            dispatch(loginPageEnabelingSliceAction.enabelingLoginPage())
          }
          className="bg-blue-600 w-11/12 text-white font-semibold text-2xl py-6 my-2 rounded-xl max-sm:py-4 max-sm:text-lg hover:bg-blue-700 cursor-pointer"
        >
          GET IT ALL THERE
        </button>
        <p className="text-sm max-sm:text-xs text-white text-center pt-3 pb-4 max-sm:pt-2 max-sm:pb-3">
          Subscribe to our movie app for ad-free streaming, exclusive content,
          and personalized recommendations. Dive into a diverse library, stream
          offline, and elevate your entertainment experience.
        </p>
        <img src="/assets/images/cta-logo-two.png" alt="" />
      </div>
      {loginPageEnabeled && <LoginPage />}
      {signUpPageEnabeled && <SignUpPage />}
      {forgotPasswordPageEnabeled && <ForgotPassword />}
    </div>
  );
};

export default LandingPage;
