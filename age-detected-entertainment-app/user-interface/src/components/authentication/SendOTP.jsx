import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendOTP = ({ setUserEmail, setComponentEnabelingList }) => {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sendOTP = async () => {
    if (email === null || email === "") {
      return toast.warning("Please enter the email address");
    }
    setIsLoading(true);
    await axios
      .post("http://localhost:8080/api/user/send-otp", { email: email })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setIsLoading(false);
          setUserEmail(email);
          setComponentEnabelingList((prev) => {
            return {
              ...prev,
              sendOTP: false,
              verifyOTP: true,
            };
          });
        } else {
          toast.error(res.data.msg);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-4">
          Email address
        </label>
        <div className="mt-2">
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            className="block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
          />
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <button
          onClick={sendOTP}
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
          <p>Send OTP</p>
        </button>
      </div>
    </div>
  );
};

export default SendOTP;
