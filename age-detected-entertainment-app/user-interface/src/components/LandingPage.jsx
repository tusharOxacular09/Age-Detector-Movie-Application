import React, { useEffect } from "react";
import LoginPage from "./authentication/LoginPage";
import SignUpPage from "./authentication/SignUpPage";
import ForgotPassword from "./authentication/ForgotPassword";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ setPageEnabelingStatus, pageEnabelingStatus }) => {
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
          (pageEnabelingStatus.loginPageEnabeled ||
            pageEnabelingStatus.signUpPageEnabeled ||
            pageEnabelingStatus.forgotPasswordPageEnabeled) &&
          "hidden"
        }`}
      >
        <img src="/assets/images/cta-logo-one.svg" alt="" />
        <button
          onClick={() =>
            setPageEnabelingStatus((prev) => {
              return {
                ...prev,
                loginPageEnabeled: true,
              };
            })
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
      {pageEnabelingStatus.loginPageEnabeled && (
        <LoginPage setPageEnabelingStatus={setPageEnabelingStatus} />
      )}
      {pageEnabelingStatus.signUpPageEnabeled && (
        <SignUpPage setPageEnabelingStatus={setPageEnabelingStatus} />
      )}
      {pageEnabelingStatus.forgotPasswordPageEnabeled && (
        <ForgotPassword setPageEnabelingStatus={setPageEnabelingStatus} />
      )}
    </div>
  );
};

export default LandingPage;
