import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const chekUserPaymentStatus = async () => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await axios
      .get(`http://localhost:8080/api/user/get-user-details/${email}`)
      .then((res) => {
        if (res.status === 200) {
          setIsUserSubscribed(res.data.userDetails.subscribed);
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    chekUserPaymentStatus();
  }, []);

  return (
    <div>
      {!isUserSubscribed ? (
        <div className="h-screen w-full">
          <div className="w-full pt-20 h-1/2 max-sm:h-1/3 bg-gradient-to-r from-gray-800 via-gray-600 to-[#040724]">
            <div className="max-md:hidden">
              <Features />
            </div>
          </div>
          <div className="relative w-full">
            <div className="absolute right-60 max-xl:right-40 max-lg:right-24 max-md:right-10 max-sm:mx-auto max-sm:right-0 max-sm:left-0 -top-52 w-72 max-sm:w-64 h-[370px] max-sm:h-[320px] z-50 bg-gray-100 rounded-xl shadow-md hover:scale-105 duration-300">
              <img
                className="w-full h-40 max-sm:h-36 rounded-t-xl"
                src="/assets/images/avatar-poster.jpg"
                alt=""
              />
              <div className="flex flex-col items-start mt-2 px-2">
                <p className="text-xl max-sm:text-lg font-semibold">
                  Only At ₹899
                </p>
                <p className="text-sm max-sm:text-xs mt-1">
                  "Experience the future of entertainment with our AI-powered
                  movie app. Personalized recommendations and a user-friendly
                  interface make finding and enjoying your favorite films
                  effortless."
                </p>
                <button
                  onClick={() => {
                    navigate("/payment-checkout");
                  }}
                  className="w-full mt-3 max-sm:py-2 max-sm:text-sm text-white font-semibold bg-blue-500 py-3 rounded-lg cursor-pointer hover:bg-blue-600"
                >
                  Upgrade Now
                </button>
              </div>
            </div>

            <div className="md:hidden pt-44 max-sm:pt-32">
              <Features />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-200 max-2xl:pl-44 max-sm:pl-16 rounded-md shadow-md h-screen w-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            {/* Successful Emojis */}
            <span className="text-4xl mr-2" role="img" aria-label="Successful">
              🎉
            </span>
            <span className="text-4xl" role="img" aria-label="Successful">
              ✨
            </span>
          </div>
          <p className="mt-2 font-semibold text-center text-2xl max-md:text-lg text-green-800">
            Congratulations! You have successfully paid the amount.
          </p>
          <p className="mt-2 font-semibold text-center text-3xl max-md:text-lg text-blue-800">
            You are now our permanent member. Thank you for your support!
          </p>
          <div
            className="flex items-center justify-center gap-2 text-blue-600 text-xl max-md:text-sm font-semibold cursor-pointer max-md:gap-1 mt-4"
            onClick={() => {
              navigate("/home");
            }}
          >
            <FaArrowLeft />
            <p>Navigate to Home Page</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Features = () => {
  return (
    <div className="max-2xl:ml-44 max-sm:ml-16 2xl:pl-10 2xl:pt-6">
      <p className="max-md:text-black text-white max-sm:text-xl max-lg:text-3xl text-4xl font-bold">
        Subscribe now and start streaming
      </p>
      <div className="text-xl max-lg:text-lg max-sm:text-sm font-medium text-gray-300 max-md:text-gray-700 font-sans flex flex-col gap-1 mt-4">
        <div className="flex items-center gap-2">
          <p>All content</p>
          <TiTickOutline />
        </div>
        <div className="flex items-center gap-2">
          <p>Movies, Live Actions, TV, Specials</p>
          <TiTickOutline />
        </div>
        <div className="flex items-center gap-2">
          <p>Watch on TV or Laptop</p>
          <TiTickOutline />
        </div>
        <div className="flex items-center gap-2">
          <p>Ads free movies and shows</p>
          <TiTickOutline />
        </div>
        <div className="flex items-center gap-2">
          <p>Number of devices that can be logged in</p>
          <TiTickOutline />
        </div>
        <div className="flex items-center gap-2">
          <p>Max video quality</p>
          <TiTickOutline />
        </div>
        <div className="flex items-center gap-2">
          <p>Max audio quality</p>
          <TiTickOutline />
        </div>
      </div>
    </div>
  );
};
export default PaymentDetails;
