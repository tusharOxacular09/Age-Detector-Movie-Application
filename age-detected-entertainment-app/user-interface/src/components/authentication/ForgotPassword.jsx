import React, { useState } from "react";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";

const ForgotPassword = ({ setPageEnabelingStatus }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [componentEnabelingList, setComponentEnabelingList] = useState({
    sendOTP: true,
    verifyOTP: false,
    resetPassword: false,
  });

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
          {componentEnabelingList.sendOTP && (
            <SendOTP
              setUserEmail={setUserEmail}
              setComponentEnabelingList={setComponentEnabelingList}
            />
          )}
          {componentEnabelingList.verifyOTP && (
            <VerifyOTP setComponentEnabelingList={setComponentEnabelingList} />
          )}
          {componentEnabelingList.resetPassword && (
            <ResetPassword
              userEmail={userEmail}
              setPageEnabelingStatus={setPageEnabelingStatus}
            />
          )}
          <div className="text-base max-sm:text-xs mt-6 max-sm:mt-4">
            <p>
              <span>No I Know My Password.</span>{" "}
              <span
                onClick={() => {
                  setPageEnabelingStatus((prev) => {
                    return {
                      ...prev,
                      loginPageEnabeled: true,
                      forgotPasswordPageEnabeled: false,
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

export default ForgotPassword;
