import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOTP = ({ setComponentEnabelingList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(null);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [timer, setTimer] = useState(120);
  const [resendEmailStyle, setResendEmailStyle] = useState(false);

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
      .post("http://localhost:8080/api/user/verify-otp", { otp: otp })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setIsLoading((prev) => !prev);
          setComponentEnabelingList((prev) => {
            return {
              ...prev,
              verifyOTP: false,
              resetPassword: true,
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
          onClick={() => {
            setComponentEnabelingList((prev) => {
              return {
                ...prev,
                sendOTP: true,
                verifyOTP: false,
              };
            });
          }}
          className={`border-b cursor-pointer hover:text-gray-300 border-white ${
            resendEmailStyle && "text-red-500 border-red-500 hover:text-red-600"
          }`}
        >
          Resend OTP
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
    </div>
  );
};

export default VerifyOTP;
