import React, { useEffect } from "react";
import { FaArrowLeft, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const updateUserPaymentStatus = async () => {
    const email = JSON.parse(localStorage.getItem("userEmail"));
    await axios
      .patch("http://localhost:8080/api/payment/update-user-payment-status/", {
        email: email,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
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
    updateUserPaymentStatus();
  }, []);
  return (
    <div className="max-sm:pl-14 max-2xl:pl-40 flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6 text-green-500">
          <FaInfo className="text-3xl max-sm:text-xl mr-2" />
          <h2 className="text-2xl font-semibold max-sm:text-xl">
            Payment Successful!
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Thank you for your payment. Your transaction was successful. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            className="max-sm:text-sm bg-gray-300 flex items-center justify-center gap-1 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 max-sm:px-2 max-sm:py-1 rounded focus:outline-none focus:shadow-outline transform transition-transform hover:scale-105"
            onClick={() => {
              navigate("/home");
            }}
          >
            <FaArrowLeft className="mr-2 max-sm:mr-0" />
            <p>Back</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
