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
        className="nightwind-prevent nightwind-prevent-block border-8 bg-gray-800 h-full flex space-y-6 flex-col justify-center items-center"
      >
        {img && (
          <img className="max-h-60 md:max-h-96" src={img} alt="yourimage" />
        )}
        <button
          className="mx-auto outline-none focus:outline-none items-center justify-center bg-white h-6 w-20 border border-black border-opacity-50 rounded-full"
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
        className="nightwind-prevent nightwind-prevent-block bg-gray-800 h-full flex space-y-6 flex-col justify-center items-center"
      >
        <Webcam
          className="border-8 max-h-60 md:max-h-96"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button
          className="mx-auto outline-none focus:outline-none items-center justify-center bg-white h-12 w-12 border border-black border-opacity-50 rounded-full"
          onClick={() => {
            setClick(true);
            capture();
          }}
        />
      </div>
    );
};

export default FaceTime;
