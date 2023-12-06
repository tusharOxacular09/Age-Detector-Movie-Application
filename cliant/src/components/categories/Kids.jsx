import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoaderComponent from "../LoaderComponent";
import { fetchKidMovies } from "../../redux/slices/movieSlicer/kidMovies";
import { FaRegPlayCircle } from "react-icons/fa";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const Kids = () => {
  const [topFiveMovies, setTopFIveMovies] = useState([]);
  const kidMovies = useSelector((state) => state.kidMovies);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const IMG_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchKidMovies());
    setTopFIveMovies(kidMovies.data?.data.data.slice(0, 5));
  }, []);

  const handelMovieDetailsPage = (title, overview, poster) => {
    const data = {
      title: title,
      overview: overview,
      poster_path: poster,
    };
    navigate("/movie-details", { state: data });
  };

  return (
    <div className="relative 2xl:pt-20 bg-[#040732] max-sm:pl-12 max-2xl:pl-44 h-screen overflow-y-auto 2xl:px-8 2xl:pb-8 max-2xl:px-4 max-2xl:pb-4 max-sm:p-2">
      <Carousel
        className="max-2xl:mt-2 hover:ring-4 ring-blue-500 duration-200 2xl:mt-2 rounded-xl"
        autoplay
      >
        {topFiveMovies?.map((movies, index) => {
          return (
            <img
              onClick={() =>
                handelMovieDetailsPage(
                  movies.title,
                  movies.overview,
                  movies.backdrop_path
                )
              }
              key={index}
              className="w-full 2xl:h-[600px] max-2xl:h-[550px] max-sm:h-[180px] max-md:h-[300px] max-lg:h-[400px] hover:opacity-80 cursor-pointer rounded-xl"
              src={IMG_URL + movies.backdrop_path}
              alt=""
            />
          );
        })}
      </Carousel>
      {kidMovies.isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="flex 2xl:mt-4 flex-wrap justify-evenly items-center 2xl:gap-4 max-sm:gap-1 gap-2">
          {kidMovies.data?.data.data.map((movie, index) => {
            return (
              <div
                key={index}
                className="relative mt-10 w-[290px] h-[290px] max-sm:w-[170px] max-sm:h-[170px] max-lg:w-[240px] max-lg:h-[240px] transition hover:scale-105 duration-500 ease-in-out z-10 bg-[#040720] shadow-sm shadow-white rounded-lg hover:z-50"
              >
                <img
                  className="shadow-sm shadow-white absolute -top-4 right-0 left-0 ml-auto mr-auto bg-fixed w-11/12 h-1/2 rounded-lg"
                  src={IMG_URL + movie.backdrop_path}
                  alt=""
                />
                <div className="absolute bottom-0 right-0 left-0 overfow-hidden w-full h-1/2 text-white p-2 max-sm:p-1.5">
                  <p className="font-semibold text-base max-sm:text-sm truncate">
                    {movie.title || movie.name || "Movie Title"}
                  </p>
                  <p className="text-xs w-full max-sm:truncate overflow-auto whitespace-normal h-1/2 max-sm:h-6 overflow-y-hidden">
                    {movie.overview}
                  </p>

                  <div
                    onClick={() =>
                      handelMovieDetailsPage(
                        movie.title,
                        movie.overview,
                        movie.backdrop_path
                      )
                    }
                    className="mt-1.5 max-sm:mt-1 text-sm max-sm:text-xs max-sm:py-1 py-2 bg-white hover:bg-gray-300 duration-300 ease-in-out rounded-sm w-full font-semibold cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FaRegPlayCircle className="text-black" />
                    <p className="text-black">Watch Now</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Kids;
