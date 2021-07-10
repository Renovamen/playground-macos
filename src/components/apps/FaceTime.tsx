import React, { Component, createRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "user"
};

interface FaceTimeState {
  click: boolean;
  img: string | null;
}

export default class FaceTime extends Component<{}, FaceTimeState> {
  private webcamRef = createRef<any>();

  constructor(props: {}) {
    super(props);
    this.state = {
      img: null,
      click: false
    };
  }

  capture = () => {
    const imageSrc = this.webcamRef.current.getScreenshot();
    this.setState({ img: imageSrc });
  };

  render() {
    if (this.state.click)
      return (
        <div
          id="container"
          className="nightwind-prevent nightwind-prevent-block border-8 bg-gray-800 h-full flex space-y-6 flex-col justify-center items-center"
        >
          {this.state.img && (
            <img
              className="max-h-60 md:max-h-96"
              src={this.state.img}
              alt="yourimage"
            />
          )}
          <button
            className="mx-auto outline-none focus:outline-none items-center justify-center bg-white h-6 w-20 border border-black border-opacity-50 rounded-full"
            onClick={() => {
              this.setState({ click: false });
            }}
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
            ref={this.webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button
            className="mx-auto outline-none focus:outline-none items-center justify-center bg-white h-12 w-12 border border-black border-opacity-50 rounded-full"
            onClick={() => {
              this.setState({ click: true });
              this.capture();
            }}
          />
        </div>
      );
  }
}
