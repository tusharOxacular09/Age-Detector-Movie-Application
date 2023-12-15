import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { TbBrandYoutubeKids } from "react-icons/tb";
import { MdOutlineNoAdultContent } from "react-icons/md";
import { MdAttractions } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ageDetectorEnabelingSliceAction } from "../../redux/slices/openAgeDetector";
import { userVerificationSliceAction } from "../../redux/slices/userVerificationStatus";
import axios from "axios";

const NavBar = ({ setPageEnabelingStatus }) => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Verifying The User On Every Render
  // Checking The User is Verified Or Not
  const isUserVerified = useSelector(
    (state) => state.userVerificationStatus.isUserVerified
  );
  useEffect(() => {
    if (isUserVerified) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  });

  const handelSignUp = () => {
    setPageEnabelingStatus((prev) => {
      return {
        ...prev,
        loginPageEnabeled: false,
        signUpPageEnabeled: true,
      };
    });
  };

  const handelLogin = () => {
    setPageEnabelingStatus((prev) => {
      return {
        ...prev,
        loginPageEnabeled: true,
        signUpPageEnabeled: false,
      };
    });
  };

  // Handeling Logout Functionality
  const handelLogout = async () => {
    try {
      const loggedOutUser = await axios.get(
        "http://localhost:8080/api/user/logout"
      );
      if (loggedOutUser.status === 200) {
        dispatch(userVerificationSliceAction.disabelingUserVerification());
        toast.success(loggedOutUser.data.msg);
        navigate("/");
        setIsVerified(false);
      } else {
        toast.warn(loggedOutUser.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handeleAdultPage = () => {
    dispatch(ageDetectorEnabelingSliceAction.enabelingAgeDetector());
  };

  return (
    <nav className="max-2xl:bg-[#0F0F14] max-2xl:bg-opacity-30 fixed max-sm:p-2 z-50 max-2xl:h-screen 2xl:h-20 flex max-2xl:flex-col 2xl:w-full 2xl:items-center 2xl:bg-black 2xl:bg-opacity-50 px-1">
      <div
        onClick={() => navigate("/home")}
        className="cursor-pointer 2xl:pl-2 gap-0.5 max-2xl:py-6 flex justify-center items-center max-sm:pt-4 max-sm:px-2 max-sm:pb-6"
      >
        <img
          className="w-6 max-sm:w-5"
          src="/assets/images/planet-earth.png"
          alt=""
        />
        <p className="text-3xl max-sm:hidden tracking-wider font-bold font-mono text-gray-100">
          XACULAR
        </p>
      </div>
      <div className="max-2xl:hidden w-3/12"></div>
      {isVerified ? (
        <div className="max-2xl:pl-2 2xl:w-5/12 max-2xl:h-3/6 max-lg:h-2/6 flex max-2xl:flex-col justify-around items-start">
          <div
            onClick={() => navigate("/home")}
            className="flex items-center justify-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <FaHome className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">Home</p>
          </div>
          <div
            onClick={() => navigate("/kids")}
            className="flex items-center justify-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <TbBrandYoutubeKids className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">Kids</p>
          </div>
          <div
            onClick={() => navigate("/action")}
            className="flex items-center justify-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <MdAttractions className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">Action</p>
          </div>
          <div
            onClick={handeleAdultPage}
            className="flex items-center justify-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <MdOutlineNoAdultContent className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">18+</p>
          </div>
          <div
            onClick={() => navigate("/docs")}
            className="flex items-center justify-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <SiGoogledocs className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">DOCS</p>
          </div>
          <div
            onClick={() => navigate("/subscription")}
            className="flex items-center justify-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <MdSubscriptions className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">Pro</p>
            <span className="relative flex h-3 w-3 max-sm:h-2 max-sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 max-sm:h-2 max-sm:w-2 bg-sky-500"></span>
            </span>
          </div>
        </div>
      ) : (
        <div className="max-2xl:hidden w-4/12"></div>
      )}
      <div className="max-2xl:hidden w-2/12"></div>

      {isVerified ? (
        <div
          onClick={handelLogout}
          className="max-2xl:pl-2 2xl:pr-2 max-2xl:mt-6 flex items-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
        >
          <FaUserCircle className="text-white text-lg" />
          <p className="text-white text-lg max-sm:hidden">Logout</p>
        </div>
      ) : (
        <div className="flex gap-4 items-center max-2xl:flex-col max-2xl:gap-0">
          <div
            onClick={handelLogin}
            className="max-2xl:pl-2 2xl:pr-2 max-2xl:mt-6 flex items-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <FaUserCircle className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">Login</p>
          </div>
          <div
            onClick={handelSignUp}
            className="max-2xl:pl-2 2xl:pr-2 max-2xl:mt-6 flex items-center gap-2 font-semibold hover:scale-110 duration-200 cursor-pointer"
          >
            <SiGnuprivacyguard className="text-white text-lg" />
            <p className="text-white text-lg max-sm:hidden">SignUp</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
