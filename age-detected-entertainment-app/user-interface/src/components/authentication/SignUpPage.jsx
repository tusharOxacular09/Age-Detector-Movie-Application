import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import VerifyNewUser from "./VerifyNewUser";

const SignUpPage = ({ setPageEnabelingStatus }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    dob: "",
    age: "",
    password: "",
    repeat_password: "",
  });

  const [emailVerificationState, setEmailVerificationState] = useState(true);

  // Handeling The Input Fields
  const handleChange = (e) => {
    setUserDetails((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  // Handeling The inpusts and Checking By Calling The api.
  const handelSignUp = async () => {
    if (
      userDetails.email === "" ||
      userDetails.dob === "" ||
      userDetails.age === "" ||
      userDetails.password === "" ||
      userDetails.repeat_password === ""
    ) {
      toast.warning("Please Enter All the Fields.");
      return null;
    } else if (
      new Date().getFullYear() - parseInt(userDetails.dob.split("-")[0]) !==
      parseInt(userDetails.age)
    ) {
      toast.warning("Enter a valid Age or Date of birth.");
      return null;
    } else if (userDetails.password.length < 8) {
      toast.warn("Password must be at least 8 characters.");
    } else if (userDetails.password !== userDetails.repeat_password) {
      toast.warning("Password and Repeat Password Didn't match.");
      return null;
    } else {
      // Registering New User
      setIsLoading((prev) => !prev);
      try {
        await axios
          .post("http://localhost:8080/api/user/verify-email", {
            email: userDetails.email,
          })
          .then((res) => {
            if (res.status === 200) {
              setIsLoading((prev) => !prev);
              toast(res.data.msg);
              setEmailVerificationState((prev) => !prev);
            } else {
              toast.error(res.data.msg);
              setIsLoading((prev) => !prev);
            }
          });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setIsLoading((prev) => !prev);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="relative bg-[#040724] text-white px-8 py-8 mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
            <div className="font-semibold text-2xl">
              <p>USER SIGNUP</p>
            </div>
            <div className="flex flex-row text-sm font-medium">
              <p>Please enter all the fields</p>
            </div>
          </div>

          {emailVerificationState ? (
            <div>
              <div className="flex items-center gap-6 max-2xl:flex-col max-2xl:gap-0">
                <div className="w-full">
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
              </div>

              <div className="flex items-center gap-6 max-2xl:flex-col max-2xl:gap-0">
                <div className="mt-4 2xl:w-1/2 max-2xl:w-full">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium leading-4"
                  >
                    Date Of Birth
                  </label>
                  <div className="mt-2">
                    <input
                      name="dob"
                      onChange={handleChange}
                      type="date"
                      className="appearance-none block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
                    />
                  </div>
                </div>

                <div className="mt-4 2xl:w-1/2 max-2xl:w-full">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-4"
                  >
                    Age
                  </label>
                  <div className="mt-2">
                    <input
                      name="age"
                      onChange={handleChange}
                      type="number"
                      className="block w-full bg-[#040724] rounded-md py-1.5 px-3 border border-gray-400 outline-none focus:ring-1 focus:ring-white duration-100"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 max-2xl:flex-col max-2xl:gap-0">
                <div className="mt-4 2xl:w-1/2 max-2xl:w-full">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-4"
                  >
                    Password{" "}
                    <span className="text-xs font-normal text-yellow-500">
                      (At Least 8 characters)
                    </span>
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
                <div className="mt-4 2xl:w-1/2 max-2xl:w-full">
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
              </div>
              <div className="flex items-center justify-evenly">
                <button
                  onClick={handelSignUp}
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
                  <p>Verify Email</p>
                </button>
              </div>
            </div>
          ) : (
            <VerifyNewUser
              userDetails={userDetails}
              setPageEnabelingStatus={setPageEnabelingStatus}
              setEmailVerificationState={setEmailVerificationState}
            />
          )}

          <div className="text-base max-sm:text-xs mt-6 max-sm:mt-4">
            <p>
              Already have an Account?{" "}
              <span
                onClick={() => {
                  setPageEnabelingStatus((prev) => {
                    return {
                      ...prev,
                      loginPageEnabeled: true,
                      signUpPageEnabeled: false,
                    };
                  });
                }}
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

export default SignUpPage;
