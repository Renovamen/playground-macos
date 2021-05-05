import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import {
  toggleDark,
  toggleWIFI,
  toggleAirdrop,
  toggleBleutooth,
  toggleFullScreen
} from "../../redux/action";

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

class ControlCenterMenu extends Component {
  render() {
    return (
      <div className="fixed w-96 max-w-full top-8 right-0 sm:right-2 z-50 p-2 grid grid-cols-4 grid-rows-5 gap-2 bg-white bg-opacity-25 blur rounded-2xl text-black shadow-2xl">
        <div className="row-span-2 col-span-2 bg-white bg-opacity-50 rounded-xl p-2 flex flex-col justify-around">
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FaWifi
              size={36}
              className={`${
                this.props.wifi
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.props.toggleWIFI(!this.props.wifi)}
            />
            <div className="flex flex-col">
              <span className="font-medium">Wifi</span>
              <span className="font-thin text-xs">
                {this.props.wifi ? "Home" : "Off"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FiBluetooth
              size={36}
              className={`${
                this.props.bluetooth
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.props.toggleBleutooth(!this.props.bluetooth)}
            />
            <div className="flex flex-col">
              <span className="font-medium">Bluetooth</span>
              <span className="font-thin text-xs">
                {this.props.bluetooth ? "On" : "Off"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2 pr-6">
            <FiRss
              size={36}
              className={`${
                this.props.airdrop
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.props.toggleAirdrop(!this.props.airdrop)}
            />
            <div className="flex flex-col">
              <span className="font-medium">AirDrop</span>
              <span className="font-thin text-xs">
                {this.props.airdrop ? "Contacts Only" : "Off"}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white bg-opacity-50 blur rounded-xl p-2 flex flex-row items-center space-x-2">
          {this.props.dark ? (
            <IoMoon
              size={34}
              className="text-gray-700 bg-gray-300 bg-opacity-50 rounded-full p-2"
              onClick={() => this.props.toggleDark(false)}
            />
          ) : (
            <IoSunny
              size={34}
              className="text-gray-700 bg-gray-300 bg-opacity-50 rounded-full p-2"
              onClick={() => this.props.toggleDark(true)}
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
          {this.props.fullscreen ? (
            <BsFullscreenExit
              size={16}
              onClick={() => this.props.toggleFullScreen(false)}
            />
          ) : (
            <BsFullscreen
              size={16}
              onClick={() => this.props.toggleFullScreen(true)}
            />
          )}
          <span className="text-xs mt-1.5">
            {this.props.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </span>
        </div>
        <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
          <span className="font-medium">Display</span>
          <SliderComponent
            icon={<IoSunny size={16} className="text-gray-500" />}
            value={this.props.brightness}
            setValue={this.props.setBrightness}
          />
        </div>
        <div className="col-span-4 bg-white bg-opacity-50 blur rounded-xl p-2 space-y-2 flex flex-col justify-around">
          <span className="font-medium">Sound</span>
          <SliderComponent
            icon={<IoVolumeHigh size={16} className="text-gray-500" />}
            value={this.props.volume}
            setValue={this.props.setVolume}
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
          {this.props.playing ? (
            <BsPauseFill
              onClick={() => this.props.toggleAudio(false)}
              size={24}
            />
          ) : (
            <BsPlayFill
              onClick={() => this.props.toggleAudio(true)}
              size={24}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dark: state.dark,
    wifi: state.wifi,
    bluetooth: state.bluetooth,
    airdrop: state.airdrop,
    fullscreen: state.fullscreen,
    volume: state.volume
  };
};

export default connect(mapStateToProps, {
  toggleDark,
  toggleWIFI,
  toggleAirdrop,
  toggleBleutooth,
  toggleFullScreen
})(ControlCenterMenu);
