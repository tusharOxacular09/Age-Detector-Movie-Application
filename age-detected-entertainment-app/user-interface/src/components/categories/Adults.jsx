import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdultMovies } from "../../redux/slices/movieSlicer/adultMovies";
import { FaRegPlayCircle } from "react-icons/fa";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import { chatSectionEnabelingSliceAction } from "../../redux/slices/chatSectionSlice";
import { toast } from "react-toastify";
import ChatComponent from "../chat-boat/ChatComponent";
import axios from "axios";
import LoaderComponent from "../Loader/LoaderComponent";

const Adults = () => {
  const [userDetails, setUserDetails] = useState({});
  const [topFiveMovies, setTopFiveMovies] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [userGivenAnswers, setUserGivenAnswers] = useState([]);
  const adultMovies = useSelector((state) => state.adultMovies);
  const chatSectionEnabeled = useSelector(
    (state) => state.chatSectionEnabeled.chatSectionEnabeled
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const IMG_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchAdultMovies());
    setTopFiveMovies(adultMovies.data?.data.data.slice(0, 5));
  }, []);

  // Navigating to the Movie Details Page
  const handelMovieDetailsPage = (title, overview, poster) => {
    const data = {
      title: title,
      overview: overview,
      poster_path: poster,
    };
    setMovieData(data);
    // Chatter Code Here
    dispatch(chatSectionEnabelingSliceAction.enabelingChatSection());
  };

  const { dob } = userDetails;
  // Handeling the answers given by the user
  const verificationHanedler = () => {
    let point = 0;
    if (userGivenAnswers[0].toLowerCase() === "yes") {
      point++;
    }
    if (
      parseInt(userGivenAnswers[1]) ===
        new Date().getFullYear() - parseInt(dob.slice(0, 4)) &&
      parseInt(userGivenAnswers[1]) >= 18
    ) {
      point++;
    }
    if (parseInt(userGivenAnswers[2]) === parseInt(dob.slice(0, 4))) {
      point++;
    }
    if (userGivenAnswers[3].toLowerCase() === "yes") {
      point++;
    }
    if (userGivenAnswers[4].toLowerCase() === "no") {
      point++;
    }

    if (point === 5) {
      // Disabling chat section
      dispatch(chatSectionEnabelingSliceAction.disabelingChatSection());
      // Navigating to the Movie Details Page
      navigate("/movie-details", { state: movieData });
    } else {
      // Disabling chat section
      dispatch(chatSectionEnabelingSliceAction.disabelingChatSection());
      toast.error("You are Not Eligible for watching these Videos...");
      navigate("/home");
    }
  };

  useEffect(() => {
    if (userGivenAnswers.length === 5) {
      verificationHanedler();
    }
  });

  // Getting the user email from localStorage
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));

  // Getting the user Details From Server
  useEffect(() => {
    const getUserData = async () => {
      const userData = await axios.get(
        `http://localhost:8080/api/user/get-user-details/${userEmail}`
      );
      setUserDetails(userData.data.userDetails);
    };
    getUserData();
  }, [userEmail]);
  
// Checking The User is Verified Or Not
const isUserVerified = useSelector(
  (state) => state.userVerificationStatus.isUserVerified
);

useEffect(() => {
  if (!isUserVerified) {
    return navigate("/");
  }
}, []);

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
      {adultMovies.isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="flex 2xl:mt-4 flex-wrap justify-evenly items-center 2xl:gap-4 max-sm:gap-1 gap-2">
          {adultMovies.data?.data.data.map((movie, index) => {
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
                  <p className="text-xs w-full max-sm:truncate overflow-auto whitespace-normal h-1/2 max-lg:h-1/3 max-sm:h-6 overflow-y-hidden">
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
      {chatSectionEnabeled && (
        <ChatComponent
          userDetails={userDetails}
          noOfQuestions={noOfQuestions}
          setNoOfQuestions={setNoOfQuestions}
          userGivenAnswers={userGivenAnswers}
          setUserGivenAnswers={setUserGivenAnswers}
        />
      )}
    </div>
  );
};

export default Adults;
