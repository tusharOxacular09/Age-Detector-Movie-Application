import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieSlider = ({ title, movieList, movieid }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [myMovies, setMyMovies] = useState([]);
  const IMG_URL = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();

  // maintaing the scrollbar in Left direction.
  const slideLeft = (id) => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  // maintaing the scrollbar in Right direction.
  const slideRight = (id) => {
    let slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    setMyMovies(movieList);
  }, [movieList]);

  const handelMovieDetailsPage = (title, overview, poster) => {
    const data = {
      title: title,
      overview: overview,
      poster_path: poster,
    };
    navigate("/movie-details", { state: data });
  };

  return (
    <div className="w-full max-sm:pl-12 max-2xl:pl-44">
      <p className="text-2xl font-bold text-white p-4">{title}</p>
      <div className="relative flex items-center">
        <MdChevronLeft
          className="absolute left-1 z-50 cursor-pointer text-white"
          onClick={() => slideLeft(movieid)}
          size={40}
        />
        <div
          id={movieid}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {myMovies?.map((movie, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`bg-black w-[250px] h-full max-sm:h-24 max-sm:w-[160px] inline-block cursor-pointer rounded-lg mx-2 max-sm:mx-1`}
              >
                <img
                  onClick={() =>
                    handelMovieDetailsPage(
                      movie.title,
                      movie.overview,
                      movie.backdrop_path
                    )
                  }
                  className="bg-cover bg-fixed w-full h-full rounded-lg hover:opacity-50"
                  src={IMG_URL + movie.backdrop_path}
                  alt="Poster of the movie"
                />
                {hoveredIndex === index && (
                  <div className="absolute -bottom-14 w-[250px] h-72 max-sm:w-[160px] max-sm:h-48 hover:scale-125 duration-1000 ease-in-out z-20 transition bg-[#0F0F14] rounded-lg">
                    <img
                      className="bg-cover bg-fixed w-full h-1/2 rounded-t-lg"
                      src={IMG_URL + movie.backdrop_path}
                      alt=""
                    />
                    <div className="overfow-hidden w-full h-1/2 text-white p-2 max-sm:p-1.5">
                      <p className="font-semibold text-base max-sm:text-sm truncate">
                        {movie.title || movie.name || "Movie Title"}
                      </p>
                      <p className="text-xs w-full overflow-auto whitespace-normal h-1/2 max-sm:h-8 overflow-y-hidden">
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
                        className="mt-1.5 max-sm:mt-1 text-sm max-sm:text-xs max-sm:py-1.5 py-2 bg-white hover:scale-105 duration-300 ease-in-out rounded-sm w-full font-semibold cursor-pointer flex items-center justify-center gap-2"
                      >
                        <FaRegPlayCircle className="text-black" />
                        <p className="text-black">Watch Now</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <MdChevronRight
          className="absolute right-1 z-50 cursor-pointer text-white"
          onClick={() => slideRight(movieid)}
          size={40}
        />
      </div>
    </div>
  );
};

export default MovieSlider;
