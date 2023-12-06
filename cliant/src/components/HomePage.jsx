import React, { useEffect } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchActionMovies } from "../redux/slices/movieSlicer/actionMovies";
import LoaderComponent from "./LoaderComponent";
import MovieSlider from "./MovieSlider";
import { fetchWarMovies } from "../redux/slices/movieSlicer/warMovies";
import { fetchDramaMovies } from "../redux/slices/movieSlicer/dramaMovies";
import { fetchFantesyMovies } from "../redux/slices/movieSlicer/fantesyMovies";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // Handeling The Background Shadow By Scrolling The Web Page.
  useEffect(() => {
    const handleScroll = () => {
      const background = document.querySelector(".background-video");
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 500; // Adjust as needed
      background.style.opacity = opacity > 0 ? opacity : 0;
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  // Fetching the movies
  const dispatch = useDispatch();
  const actionMovies = useSelector((state) => state.actionMovies);
  const warMovies = useSelector((state) => state.warMovies);
  const dramaMovies = useSelector((state) => state.dramaMovies);
  const fantesyMovies = useSelector((state) => state.fantesyMovies);

  useEffect(() => {
    dispatch(fetchFantesyMovies());
    dispatch(fetchDramaMovies());
    dispatch(fetchWarMovies());
    dispatch(fetchActionMovies());
  }, [dispatch]);

  const handelMovieDetailsPage = (title, overview, poster) => {
    const data = {
      title: title,
      overview: overview,
      poster_path: poster,
    };
    navigate("/movie-details", { state: data });
  };

  return (
    <div className="">
      <div className="absolute z-10 w-full">
        <div className="max-sm:pr-2 max-2xl:pl-48 max-sm:pl-2 mt-20 max-sm:w-9/12 max-sm:ml-16 w-6/12 2xl:w-1/4 2xl:mt-24 2xl:pt-20 2xl:ml-20 flex flex-col items-start justify-evenly">
          <img
            className="w-full max-sm:w-10/12"
            src="/assets/images/avatar.png"
            alt=""
          />
          <p className="text-2xl max-sm:text-xl font-bold text-blue-600 mt-4 max-sm:mt-3">
            New Realesed
          </p>
          <div className="font-bold text-white max-sm:text-sm w-full flex items-center justify-between mt-2">
            <p>U/A 16+</p> <p>7 Languages</p>{" "}
            <p className="p-1 bg-white opacity-40 rounded-md text-black">
              U/A 16+
            </p>
          </div>
          <p className=" text-white text-base max-sm:text-xs mt-3 max-sm:mt-2 font-medium">
            Avatar is a visually stunning 2023 sci-fi film directed by James
            Cameron. With groundbreaking 3D technology.
          </p>
          <p className="text-white font-semibold text-xl max-sm:text-base mt-3 max-sm:mt-2">
            Drama | Action | Thriler | Suspence
          </p>
          <div
            onClick={() =>
              handelMovieDetailsPage(
                "Avatar: The Way Of Water",
                "Avatar is a visually stunning 2023 sci-fi film directed by James Cameron. With groundbreaking 3D technology.",
                "/assets/images/avatar-poster.jpg"
              )
            }
            className="mt-8 max-sm:mt-6 flex max-sm:text-base max-sm:py-3 bg-white rounded-lg w-full py-4 font-semibold cursor-pointer hover:scale-105 duration-300 ease-in-out text-xl items-center justify-center gap-3"
          >
            <FaRegPlayCircle className="" />
            <p>Watch Now</p>
          </div>
        </div>

        {actionMovies.isLoading ? (
          <div className="mt-16 max-sm:mt-10">
            <LoaderComponent />
          </div>
        ) : (
          <div className="mt-12">
            <MovieSlider
              movieid={1}
              title={"Action"}
              movieList={actionMovies.data?.data.data}
            />
            <MovieSlider
              movieid={2}
              title={"War"}
              movieList={warMovies.data?.data.data}
            />
            <MovieSlider
              movieid={3}
              title={"Drama"}
              movieList={dramaMovies.data?.data.data}
            />
            <MovieSlider
              movieid={4}
              title={"Fantesy"}
              movieList={fantesyMovies.data?.data.data}
            />
          </div>
        )}
        <div className="w-full h-14"></div>
      </div>

      <div className="bg-opacity-container">
        <div className="z-minus-1 w-full h-screen bg-[#0F0F14] fixed"></div>
        <img
          className="background-video"
          src="/assets/images/avatar-poster.jpg"
        />
      </div>
    </div>
  );
};

export default HomePage;
