import { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "user"
};

const FaceTime = () => {
  const [click, setClick] = useState(false);
  const [img, setImg] = useState("");
  const webcamRef = useRef<Webcam>(null);

  const capture = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot() as string;
    setImg(imageSrc);
  };

  if (click)
    return (
      <div
        id="container"
        className="bg-gray-800 h-full flex-center flex-col space-y-6"
      >
        {img && (
          <img
            className="border-8 border-white max-h-60 md:max-h-96"
            src={img}
            alt="yourimage"
          />
        )}
        <button
          className="text-black mx-auto no-outline bg-white h-6 w-20"
          border="1 black opacity-50 rounded-full"
          onClick={() => setClick(false)}
        >
          <b>Retake</b>
        </button>
      </div>
    );
  else
    return (
      <div
        id="container"
        className="bg-gray-800 h-full flex-center flex-col space-y-6"
      >
        <Webcam
          className="border-8 border-white max-h-60 md:max-h-96"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button
          className="mx-auto no-outline bg-white h-12 w-12"
          border="1 black opacity-50 rounded-full"
          onClick={() => {
            setClick(true);
            capture();
          }}
        />
      </div>
    );
};

export default FaceTime;
