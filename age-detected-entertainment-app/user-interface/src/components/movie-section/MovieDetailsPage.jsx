import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import { FaArrowLeft } from "react-icons/fa";

// Ratings
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const MovieDetailsPage = () => {
  const [value, setValue] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const IMG_URL = "https://image.tmdb.org/t/p/original";

  // Checking The User is Verified Or Not
  const isUserVerified = useSelector(
    (state) => state.userVerificationStatus.isUserVerified
  );
  useEffect(() => {
    if (!isUserVerified) {
      return navigate("/");
    }
  });

  return (
    <div
      style={
        data?.title !== "Avatar: The Way Of Water"
          ? { backgroundImage: `url("${IMG_URL + data?.poster_path}")` }
          : { backgroundImage: `url("${data?.poster_path}")` }
      }
      className="bg-[#040732] h-full w-full bg-top absolute left-0 right-0 top-0 bottom-0 z-minus-1 bg-cover bg-no-repeat flex items-center justify-start"
    >
      <div className="max-sm:pr-2 max-2xl:pl-48 max-sm:pl-2 mt-20 max-sm:w-9/12 max-sm:ml-16 w-6/12 2xl:w-1/4 2xl:mt-24 2xl:ml-20 flex flex-col items-start justify-evenly">
        <p className="2xl:text-6xl max-2xl:text-4xl max-sm:text-2xl text-white font-bold">
          {data?.title}
        </p>
        <p className="text-2xl max-sm:text-xl font-bold text-blue-600 mt-4 max-sm:mt-3">
          New Realesed
        </p>
        <div className="font-bold text-white max-sm:text-sm w-full flex items-center justify-between mt-2">
          <p>M/N 18+</p> <p>7 Languages</p>{" "}
          <p className="p-1 bg-white opacity-40 rounded-md text-black">
            U/A 16+
          </p>
        </div>
        <p className=" text-white text-base max-sm:text-xs mt-3 max-sm:mt-2 font-medium">
          {data?.overview}
        </p>
        <p className="text-white font-semibold text-xl max-sm:text-base mt-3 max-sm:mt-2">
          Drama | Action | Romance | Suspence
        </p>
        <div className="bg-white mt-4 2xl:py-5 2xl:px-10 max-sm:py-3 max-sm:px-5 py-4 px-8 rounded-lg">
          <div className="flex items-center max-sm:items-start justify-center gap-2 max-sm:flex-col">
            <p className="font-medium max-2xl:text-base max-sm:text-sm">
              Rate Now
            </p>
            <Rate tooltips={desc} value={value} onChange={setValue} />
          </div>
        </div>
        <div
          onClick={() => {
            navigate("/home");
          }}
          className="mt-4 cursor-pointer hover:text-gray-300 text-white flex items-center justify-center gap-1 font-medium"
        >
          <FaArrowLeft />
          <p>back</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
