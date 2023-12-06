import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { forgotPasswordPageEnabelingSliceAction } from "../redux/slices/forgotPasswordPageSlice";
import { loginPageEnabelingSliceAction } from "../redux/slices/loginPageSlice";
import axios from "axios";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });

  const dispatch = useDispatch();
  const forgotPasswordPageEnabeled = useSelector(
    (state) => state.forgotPasswordPageEnabeled.forgotPasswordPageEnabeled
  );

  if (!forgotPasswordPageEnabeled) {
    return null;
  }

  // Handeling The Input Fields
  const handleChange = (e) => {
    setUserDetails((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  // Handeling The inpusts and Checking By Calling The api.
  const handelForgotPassword = async () => {
    if (
      userDetails.email === "" ||
      userDetails.password === "" ||
      userDetails.repeat_password === ""
    ) {
      toast.warning("Please Enter All the Fields.");
      return null;
    } else if (userDetails.password !== userDetails.repeat_password) {
      toast.warning("Password and Repeat Password Didn't match.");
      return null;
    } else {
      try {
        const userData = {
          email: userDetails.email,
          password: userDetails.password,
        };
        const loggedOutUser = await axios.patch(
          "http://localhost:8080/api/user/reset-password",
          userData
        );
        if (loggedOutUser.status === 200) {
          toast.success(loggedOutUser.data.msg);
          handelLoginPage();
        } else {
          toast.error(loggedOutUser.data.msg);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Handeling The Login Page
  const handelLoginPage = () => {
    dispatch(forgotPasswordPageEnabelingSliceAction.disabelingForgotPassword());
    dispatch(loginPageEnabelingSliceAction.enabelingLoginPage());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="relative bg-[#040724] text-white px-8 py-8 mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
            <div className="font-semibold text-2xl">
              <p>RESET USER PASSWORD</p>
            </div>
            <div className="flex flex-row text-sm font-medium">
              <p>Please enter all the fields</p>
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
              onClick={handelForgotPassword}
              className="w-full rounded-md text-center mt-6 bg-indigo-600 py-2.5 max-sm:py-2 text-sm max-sm:text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
          <div className="text-base max-sm:text-xs mt-6 max-sm:mt-4">
            <p>
              No I Know My Password.{" "}
              <span
                onClick={handelLoginPage}
                className="text-blue-500 hover:text-blue-400 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
