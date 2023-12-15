import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = ({ userEmail, setPageEnabelingStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    password: "",
    repeat_password: "",
  });

  // Handeling The Input Fields
  const handleChange = (e) => {
    setUserDetails((value) => ({ ...value, [e.target.name]: e.target.value }));
  };
  // Handeling The inpusts and Checking By Calling The api.
  const handelResetPassword = async () => {
    if (userDetails.password === "" || userDetails.repeat_password === "") {
      return toast.warning("Please Enter All the Fields.");
    } else if (userDetails.password !== userDetails.repeat_password) {
      return toast.warning("Password and Repeat Password Didn't match.");
    } else {
      setIsLoading((prev) => !prev);
      try {
        const userData = {
          email: userEmail,
          password: userDetails.password,
        };
        await axios
          .patch("http://localhost:8080/api/user/reset-password", userData)
          .then((res) => {
            if (res.status === 200) {
              setIsLoading((prev) => !prev);
              toast.success(res.data.msg);
              setPageEnabelingStatus((prev) => {
                return {
                  ...prev,
                  loginPageEnabeled: true,
                  forgotPasswordPageEnabeled: false,
                };
              });
            } else {
              toast.error(res.data.msg);
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-4"
        >
          Password
        </label>
        <div className="relative mt-2">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            className="block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 py-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="repeat_password"
          className="block text-sm font-medium leading-4"
        >
          Repeat Password
        </label>
        <div className="relative mt-2">
          <input
            name="repeat_password"
            type={showRepeatPassword ? "text" : "password"}
            onChange={handleChange}
            className="block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 py-2"
            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
          >
            {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <button
          onClick={handelResetPassword}
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
          <p>Reset Password</p>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
