import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const VerifyNewUser = ({
  userDetails,
  setPageEnabelingStatus,
  setEmailVerificationState,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [timer, setTimer] = useState(120);
  const [resendEmailStyle, setResendEmailStyle] = useState(false);
  const [resendOTPLoader, setResendOtpLoader] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minute if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minute by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
      setTimer(timer - 1);
    }, 1000);
    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds]); // run this effect when ever second changes

  const handelVerifyOTP = async () => {
    if (otp === null || otp === "") {
      return toast.warn("Please enter the OTP.");
    }
    setIsLoading((prev) => !prev);
    await axios
      .post("http://localhost:8080/api/user/register", {
        ...userDetails,
        otp: otp,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setIsLoading((prev) => !prev);
          setPageEnabelingStatus((prev) => {
            return {
              ...prev,
              loginPageEnabeled: true,
              signUpPageEnabeled: false,
            };
          });
        } else {
          toast.error(res.data.msg);
          setIsLoading((prev) => !prev);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
        setIsLoading((prev) => !prev);
      });
  };

  const ResendOtpHandeler = async () => {
    // Here the user may click the button twice.
    // Hence the state is updated directly.
    setResendOtpLoader(true);
    setMinutes(1);
    setSeconds(59);
    setTimer(120);
    try {
      await axios
        .post("http://localhost:8080/api/user/verify-email", {
          email: userDetails.email,
        })
        .then((res) => {
          if (res.status === 200) {
            toast(res.data.msg);
            setResendOtpLoader((prev) => !prev);
          } else {
            toast.error(res.data.msg);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoading((prev) => !prev);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      toast.error("Time Limit Exceeded. Try Again!");
      setResendEmailStyle(true);
    }
  }, [timer]);

  return (
    <div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-4">
          Enter OTP
        </label>
        <div className="mt-2">
          <input
            name="otp"
            onChange={(e) => setOtp(e.target.value)}
            type="otp"
            className="block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm max-sm:text-xs mt-4 max-sm:mt-3">
        <p>
          <span className="max-sm:hidden">Time Remaining: </span>
          <span className="font-semibold">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
        <button
          onClick={ResendOtpHandeler}
          className={`flex items-center justify-center border-b cursor-pointer hover:text-gray-300 border-white hover:border-gray-300 ${
            resendEmailStyle && "text-red-500 border-red-500 hover:text-red-600"
          }`}
        >
          {resendOTPLoader && (
            <svg
              className="animate-spin -ml-1 mr-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <p>Resend OTP</p>
        </button>
      </div>
      <div className="flex items-center justify-evenly">
        <button
          onClick={handelVerifyOTP}
          className="flex items-center justify-center w-full rounded-md text-center mt-6 bg-indigo-600 py-2.5 max-sm:py-2 text-sm max-sm:text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <p>Verify OTP</p>
        </button>
      </div>
      <div
        onClick={() => {
          setEmailVerificationState((prev) => !prev);
        }}
        className="absolute right-8 bottom-8 mt-4 cursor-pointer hover:text-gray-300 text-white flex items-center justify-center gap-1 font-medium"
      >
        <FaArrowLeft />
        <p>back</p>
      </div>
    </div>
  );
};

export default VerifyNewUser;
