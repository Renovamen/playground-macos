import React, { Component } from "react";
import nightwind from "nightwind/helper";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

// ------- import icons -------
import { FiBluetooth, FiRss } from "react-icons/fi";
import {
  BsBrightnessAltHigh,
  BsPlayFill,
  BsPauseFill,
  BsFullscreen,
  BsFullscreenExit
} from "react-icons/bs";
import { IoSunny, IoMoon, IoVolumeHigh } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";

const enterFullScreen = () => {
  const element = document.documentElement;
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
};

const exitFullScreen = () => {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
  else if (document.mozExitFullScreen) document.mozExitFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
};

const SliderComponent = ({ icon, value, setValue }) => {
  return (
    <div className="slider flex flex-row w-full">
      <div className="h-8 p-2 bg-white rounded-l-full">{icon}</div>
      <Slider
        min={1}
        max={100}
        value={value}
        tooltip={false}
        orientation="horizontal"
        onChange={(v) => setValue(v)}
      />
    </div>
  );
};

export default class ControlCenterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      volume: 100,
      brightness: Math.floor(Math.random() * 100),
      btn: {
        wifi: true,
        bluetooth: true,
        airdrop: true
      },
      fullscreen: false
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.audio = new Audio("music/sunflower.mp3");
    this.audio.load();
    this.audio.addEventListener("ended", () => this.audio.play());
    this.audio.volume = 1;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    this.audio.removeEventListener("ended", () => this.audio.play());
  }

  resize = () => {
    const isFullScreen = !!(
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
    this.setState({
      fullscreen: isFullScreen
    });
  };

  toggleAudio = () => {
    this.setState({ playing: !this.state.playing }, () => {
      this.state.playing ? this.audio.play() : this.audio.pause();
    });
  };

  toggleMode = () => {
    this.props.setDark(!this.props.dark);
    nightwind.toggle();
  };

  toggleBtn = (name) => {
    let btn = this.state.btn;
    btn[name] = !btn[name];
    this.setState({
      btn: btn
    });
  };

  toggleFullScreen = () => {
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      this.state.fullscreen ? enterFullScreen() : exitFullScreen();
    });
  };

  setVolume = (value) => {
    this.setState({ volume: value }, () => {
      this.audio.volume = value / 100;
    });
  };

  setBrightness = (value) => {
    this.setState({
      brightness: value
    });
  };

  render() {
    return (
      <div className="fixed w-96 max-w-full top-8 right-0 sm:right-2 z-50 p-2 grid grid-cols-4 grid-rows-5 gap-2 bg-white bg-opacity-25 blur rounded-2xl text-black shadow-2xl">
        <div className="row-span-2 col-span-2 bg-white bg-opacity-50 rounded-xl p-2 flex flex-col justify-around">
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FaWifi
              size={36}
              className={`${
                this.state.btn.wifi
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.toggleBtn("wifi")}
            />
            <div className="flex flex-col">
              <span className="font-medium">Wifi</span>
              <span className="font-thin text-xs">
                {this.state.btn.wifi ? "Home" : "Off"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FiBluetooth
              size={36}
              className={`${
                this.state.btn.bluetooth
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.toggleBtn("bluetooth")}
            />
            <div className="flex flex-col">
              <span className="font-medium">Bluetooth</span>
              <span className="font-thin text-xs">
                {this.state.btn.bluetooth ? "On" : "Off"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FiRss
              size={36}
              className={`${
                this.state.btn.airdrop
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.toggleBtn("airdrop")}
            />
            <div className="flex flex-col">
              <span className="font-medium">AirDrop</span>
              <span className="font-thin text-xs">
                {this.state.btn.airdrop ? "Contacts Only" : "Off"}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-row items-center space-x-2">
          {this.props.dark ? (
            <IoMoon
              size={34}
              className="text-gray-700 bg-gray-300 bg-opacity-50 rounded-full p-2"
              onClick={() => this.toggleMode()}
            />
          ) : (
            <IoSunny
              size={34}
              className="text-gray-700 bg-gray-300 bg-opacity-50 rounded-full p-2"
              onClick={() => this.toggleMode()}
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium ml-1">
              {this.props.dark ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
        </div>
        <div className="bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-col justify-center items-center text-center">
          <BsBrightnessAltHigh size={20} />
          <span className="text-xs">Keyboard Brightness</span>
        </div>
        <div className="bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-col justify-center items-center text-center">
          {this.state.fullscreen ? (
            <BsFullscreenExit size={16} onClick={this.toggleFullScreen} />
          ) : (
            <BsFullscreen size={16} onClick={this.toggleFullScreen} />
          )}
          <span className="text-xs mt-1.5">
            {this.state.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </span>
        </div>
        <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
          <span className="font-medium">Display</span>
          <SliderComponent
            icon={<IoSunny size={16} className="text-gray-500" />}
            value={this.state.brightness}
            setValue={this.setBrightness}
          />
        </div>
        <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
          <span className="font-medium">Sound</span>
          <SliderComponent
            icon={<IoVolumeHigh size={16} className="text-gray-500" />}
            value={this.state.volume}
            setValue={this.setVolume}
          />
        </div>
        <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 pr-4 flex flex-row justify-between items-center space-x-4">
          <img
            src="//p1.music.126.net/z0IO1vEsowL9mD_5yzUjeA==/109951163936068098.jpg"
            alt="cover art"
            className="w-16 rounded-lg"
          />
          <div className="flex flex-col flex-grow justify-start">
            <span className="font-medium">Sunflower</span>
            <span className="font-extralight">Post Malone / Swae Lee</span>
          </div>
          {this.state.playing ? (
            <BsPauseFill onClick={this.toggleAudio} size={24} />
          ) : (
            <BsPlayFill onClick={this.toggleAudio} size={24} />
          )}
        </div>
      </div>
    );
  }
}
