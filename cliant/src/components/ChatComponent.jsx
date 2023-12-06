import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import LoaderComponent from "./LoaderComponent";

const ChatComponent = ({
  noOfQuestions,
  setNoOfQuestions,
  userGivenAnswers,
  setUserGivenAnswers,
}) => {
  // Answers for each question will be store in this state
  const [answer, setAnswer] = useState("");

  // State For the chatSection
  const chatSectionEnabeled = useSelector(
    (state) => state.chatSectionEnabeled.chatSectionEnabeled
  );
  if (!chatSectionEnabeled) {
    return null;
  }

  // Questions
  const verifyingQuestions = [
    "Are you over 18 yesrs old?",
    "Then! What is your current age?",
    "Please, Confirm with your YEAR of birth.",
    "Can you legally purches and consume alcohol?",
    "Have you ever attended elementary school in the past year?",
  ];

  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-black bg-opacity-60 flex justify-center items-center">
      <div className="relative w-[850px] max-lg:w-[700px] max-md:w-full h-[600px] bg-[#5067eb] rounded-2xl p-4 max-sm:p-3 flex flex-col">
        <div className="2xl:m-2 flex items-start gap-2">
          <img
            className="w-12 max-xl:w-10 shadow-lg rounded-2xl"
            src="/assets/images/planet-earth.png"
            alt=""
          />
          <div className="text-white">
            <p className="font-bold max-xl:text-base">OXACULAR CHATTER</p>
            <p className="text-sm max-xl:text-xs">
              Answer Everything Correctly.
            </p>
          </div>
        </div>
        <div className="h-[800px] p-2 max-sm:p-1 2xl:mx-2 my-2 max-md:mt-4 border-2 border-gray-600 rounded-xl overflow-y-auto whitespace-nowrap scroll-smooth scrollbar-hide">
          {verifyingQuestions.map((question, index) => {
            while (index < noOfQuestions) {
              return (
                <div key={index}>
                  <QuestionComponent question={question} />
                  <AnswerComponent answer={userGivenAnswers[index]} />
                </div>
              );
            }  
          })}
        </div>
        <div className="h-1/4 flex items-end">
          <div className="relative 2xl:h-14 w-full max-lg:h-12 m-2 max-md:m-1 max-sm:mb-2">
            <input
              type="text"
              value={answer}
              className="rounded-md outline-none w-full focus:ring-4 max-md:focus:ring-2 ring-white duration-200 py-3 max-md:py-1.5 max-sm:m-0 h-full px-4 max-md:px-2 text-white font-medium bg-[#040720]"
              placeholder="Enter Your Answer Here..."
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-5 max-md:pr-3.5 max-sm:pr-3"
              onClick={(e) => {
                e.preventDefault();
                setUserGivenAnswers((prev) => [...prev, answer]);
                setAnswer("");
                setNoOfQuestions((prev) => prev + 1);
              }}
            >
              <RiSendPlaneFill className="text-white hover:scale-110 duration-200 font-bold w-8 h-7 max-md:w-6 max-md:h-5" />
            </button>
          </div>
        </div>
        {userGivenAnswers.length === 5 && (
          <div className="absolute flex items-center justify-center w-full h-full">
            <LoaderComponent />
          </div>
        )}
      </div>
    </div>
  );
};

// QuestionComponent
const QuestionComponent = ({ question }) => {
  return (
    <div>
      <p className="text-white duration-500 bg-[#040720] py-1 px-2 rounded-md w-fit my-1">
        {question}
      </p>
    </div>
  );
};

// Answer Component
const AnswerComponent = ({ answer }) => {
  return (
    <div className="flex justify-end">
      <p className="text-white bg-[#040720] py-1 px-2 rounded-md w-fit my-1">
        {answer}
      </p>
    </div>
  );
};
export default ChatComponent;
