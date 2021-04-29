import React, {useState, useRef} from "react";
import Webcam from "react-webcam";
import Window from "../components/Window";

const videoConstraints = {
  facingMode: "user"
};

function FaceTimeContent() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [click, setClick] = useState(false);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    },
    [webcamRef,setImgSrc]
  );
  if(click)
    return(
      <div id="container" className="border-8 bg-gray-800 h-full flex space-y-6 flex-col justify-center items-center">
        {imgSrc && (
          <img className="max-h-60 md:max-h-96" src={imgSrc} alt="yourimage"/>
        )}
        <button
        style={{
          borderWidth:1,
          borderColor:'rgba(0, 0, 0, 0.5)',
          alignItems:'center',
          justifyContent:'center',
          width:75,
          height:25,
          backgroundColor:'#fff',
          borderRadius:50
        }}
        className={`mx-auto`} onClick={() => { setClick(false); }}><b>Retake</b></button>
      </div>
    );
  else
    return (
      <div id="container" className="bg-gray-800 h-full flex space-y-6 flex-col justify-center items-center">
        <Webcam className="border-8 max-h-60 md:max-h-96"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button
          style={{
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.5)',
            alignItems:'center',
            justifyContent:'center',
            width:50,
            height:50,
            backgroundColor:'#fff',
            borderRadius:50
          }}
          className={`mx-auto`}
          onClick={() => { setClick(true); capture();}}
        />
      </div>
  );
}

export default function FaceTime({show, setShow, active, z}) {
  const [faceTimeMax, setFaceTimeMax] = useState(false);
  return (
    <Window
      content={<FaceTimeContent />}
      title="FaceTime"
      show={show}
      setShow={setShow}
      max={faceTimeMax}
      setMax={setFaceTimeMax}
      active={active}
      z={z}
    />
  );
}
