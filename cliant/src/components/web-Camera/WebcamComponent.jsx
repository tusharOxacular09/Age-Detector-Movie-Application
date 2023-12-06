import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ageDetectorEnabelingSliceAction } from "../../redux/slices/openAgeDetector";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../LoaderComponent";

const WebcamComponent = () => {
  const [verifying, setVerifying] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const isAgeDetectorEnabeled = useSelector(
    (state) => state.ageDetectorEnabeled.ageDetectorEnabeled
  );
  const dispatch = useDispatch();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopCamera = () => {
    // Check if mediaStream is available
    const tracks = videoRef.current.srcObject?.getTracks();
    tracks && tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };

  const captureImage = async () => {
    setVerifying(true);
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    sendImageToServer(imageDataUrl);
  };

  const sendImageToServer = async (imageDataUrl) => {
    const blob = dataURLtoBlob(imageDataUrl);
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    try {
      const response = await axios.post(
        "http://localhost:5000/detect-age",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.age);
        const detectedAge = response.data.age;
        if (detectedAge >= 18) {
          navigate("/adult");
          toast.success("Adult Verification Successful");
          // toast.success("Detected Age is : " + detectedAge);
          cancelAgeDetector();
          setVerifying(false);
        } else {
          toast.error("Age is Not Appropriate for watching these Videos..");
        }
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error:", error);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  useEffect(() => {
    startCamera();
  }, []);

  const cancelAgeDetector = () => {
    stopCamera();
    dispatch(ageDetectorEnabelingSliceAction.disabelingAgeDetector());
  };

  if (!isAgeDetectorEnabeled) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-black bg-opacity-60 flex flex-col justify-center items-center">
      <video
        className="rounded-xl ring-4 max-sm:ring-2 ring-blue-600"
        ref={videoRef}
        autoPlay
      ></video>
      <div className="mt-5 max-sm:mt-3 flex items-center justify-center gap-4 max-sm:gap-2">
        <button
          className="bg-blue-500 px-8 max-sm:px-4 py-3 max-sm:py-2 mt-5 rounded-md hover:bg-blue-600 cursor-pointer text-white font-semibold max-sm:text-sm"
          onClick={captureImage}
        >
          Verify Me
        </button>
        <button
          className="bg-blue-500 px-8 max-sm:px-4 py-3 max-sm:py-2 mt-5 rounded-md hover:bg-blue-600 cursor-pointer text-white font-semibold max-sm:text-sm"
          onClick={cancelAgeDetector}
        >
          Cancel
        </button>
      </div>
      {verifying && (
        <div className="absolute flex items-center justify-center w-full h-fit">
          <LoaderComponent msg={"Please Wait... We are analyzing your age.."} />
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
