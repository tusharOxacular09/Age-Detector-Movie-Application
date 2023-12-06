import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginPageEnabelingSliceAction } from "../redux/slices/loginPageSlice";
import { signUpPageEnabelingSliceAction } from "../redux/slices/signUpPageSlice";
import { useNavigate } from "react-router-dom";
import { forgotPasswordPageEnabelingSliceAction } from "../redux/slices/forgotPasswordPageSlice";
import axios from "axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // This Line is mandatory for saving the cookies in the browser.
  axios.defaults.withCredentials = true;
  const loginPageEnabeled = useSelector(
    (state) => state.loginPageEnabeled.loginPageEnabeled
  );
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  if (!loginPageEnabeled) {
    return null;
  }

  // Handeling The Input Fields
  const handleChange = (e) => {
    setUserLoginDetails((user_value) => ({
      ...user_value,
      [e.target.name]: e.target.value,
    }));
  };

  // Handeling The inpusts and Checking By Calling The api.
  const handelLogin = async () => {
    if (userLoginDetails.email === "" || userLoginDetails.password === "") {
      toast.warning("Please Enter All the Fields.");
      return null;
    } else {
      try {
        const loggingUser = await axios.post(
          "http://localhost:8080/api/user/login",
          userLoginDetails
        );

        if (loggingUser.status === 200) {
          toast.success(loggingUser.data.msg);
          localStorage.setItem(
            "userEmail",
            JSON.stringify(userLoginDetails.email)
          );
          // navigate to home page
          navigate("/home");
          dispatch(loginPageEnabelingSliceAction.disabelingLoginPage());
        } else {
          toast.error(loggingUser.data.msg);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="relative bg-[#040724] text-white px-8 py-8 mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
            <div className="font-semibold text-2xl">
              <p>USER LOGIN</p>
            </div>
            <div className="flex flex-row text-sm font-medium">
              <p>Please enter all the required fields</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-4"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                onChange={handleChange}
                type="email"
                autoComplete="email"
                className="block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
              />
            </div>
          </div>
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
          <div className="flex items-center justify-evenly">
            <button
              onClick={handelLogin}
              className="w-full rounded-md text-center mt-6 bg-indigo-600 py-2.5 max-sm:py-2 text-sm max-sm:text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
          <div className="flex justify-between text-base max-sm:text-xs mt-6 max-sm:mt-4">
            <p>
              New User?{" "}
              <span
                onClick={() => {
                  dispatch(
                    signUpPageEnabelingSliceAction.enabelingSignUpPage()
                  );
                  dispatch(loginPageEnabelingSliceAction.disabelingLoginPage());
                }}
                className="text-blue-500 hover:text-blue-400 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
            <p
              onClick={() => {
                dispatch(
                  forgotPasswordPageEnabelingSliceAction.enabelingForgotPassword()
                );
                dispatch(loginPageEnabelingSliceAction.disabelingLoginPage());
              }}
              className="cursor-pointer"
            >
              Forgot Password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
