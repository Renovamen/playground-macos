import React, { Component, createRef } from "react";
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
import music from "../../configs/music";

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

interface SliderProps {
  icon: JSX.Element;
  value: number;
  setValue: (value: number) => void;
}

const SliderComponent = ({ icon, value, setValue }: SliderProps) => {
  return (
    <div className="slider flex flex-row w-full">
      <div className="h-7 p-2 bg-gray-100 rounded-l-full border-t border-l border-b border-gray-300">
        {icon}
      </div>
      <Slider
        min={1}
        max={100}
        value={value}
        tooltip={false}
        orientation="horizontal"
        onChange={(v: number) => setValue(v)}
      />
    </div>
  );
};

interface CCMRedux {
  dark: boolean;
  wifi: boolean;
  brightness: number;
  bluetooth: boolean;
  airdrop: boolean;
  fullscreen: boolean;
  volume: number;
}

interface CCMProps extends CCMRedux {
  btnRef: any;
  toggleControlCenter: () => void;
  toggleDark: Function;
  toggleWIFI: Function;
  toggleAirdrop: Function;
  toggleBleutooth: Function;
  toggleFullScreen: Function;
  setBrightness: (value: number) => void;
  setVolume: (value: number) => void;
  toggleAudio: (target: boolean) => void;
  playing: boolean;
}

class ControlCenterMenu extends Component<CCMProps, {}> {
  private controlCenterRef = createRef<any>();

  constructor(props: CCMProps) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e: MouseEvent): void {
    if (
      this.controlCenterRef &&
      !this.controlCenterRef.current.contains(e.target) &&
      !this.props.btnRef.current.contains(e.target)
    )
      this.props.toggleControlCenter();
  }

  render() {
    return (
      <div
        className="fixed w-80 h-96 max-w-full top-8 right-0 sm:right-2 p-2.5 grid grid-cols-4 grid-rows-5 gap-2 bg-gray-100 bg-opacity-70 blur rounded-2xl text-black border border-gray-400 border-opacity-50"
        style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)" }}
        ref={this.controlCenterRef}
      >
        <div className="control-grid row-span-2 col-span-2 p-2 flex flex-col justify-around">
          <div className="flex flex-row items-center space-x-2">
            <FaWifi
              size={32}
              className={`${
                this.props.wifi
                  ? "bg-blue-500 text-white"
                  : "bg-gray-400 bg-opacity-25 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.props.toggleWIFI(!this.props.wifi)}
            />
            <div className="flex flex-col pt-0.5">
              <span className="font-medium leading-4">Wi-Fi</span>
              <span className="text-xs text-gray-500">
                {this.props.wifi ? "Home" : "Off"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <FiBluetooth
              size={32}
              className={`${
                this.props.bluetooth
                  ? "bg-blue-500 text-white"
                  : "bg-gray-400 bg-opacity-25 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.props.toggleBleutooth(!this.props.bluetooth)}
            />
            <div className="flex flex-col pt-0.5">
              <span className="font-medium leading-4">Bluetooth</span>
              <span className="text-xs text-gray-500">
                {this.props.bluetooth ? "On" : "Off"}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <FiRss
              size={32}
              className={`${
                this.props.airdrop
                  ? "bg-blue-500 text-white"
                  : "bg-gray-400 bg-opacity-25 text-gray-700"
              } rounded-full p-2`}
              onClick={() => this.props.toggleAirdrop(!this.props.airdrop)}
            />
            <div className="flex flex-col pt-0.5">
              <span className="font-medium leading-4">AirDrop</span>
              <span className="text-xs text-gray-500">
                {this.props.airdrop ? "Contacts Only" : "Off"}
              </span>
            </div>
          </div>
        </div>
        <div className="control-grid col-span-2 p-2 flex flex-row items-center space-x-2">
          {this.props.dark ? (
            <IoMoon
              size={32}
              className="text-gray-700 bg-gray-400 bg-opacity-25 rounded-full p-2"
              onClick={() => this.props.toggleDark(false)}
            />
          ) : (
            <IoSunny
              size={32}
              className="text-gray-700 bg-gray-400 bg-opacity-25 rounded-full p-2"
              onClick={() => this.props.toggleDark(true)}
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium ml-1">
              {this.props.dark ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
        </div>
        <div className="control-grid p-2 flex flex-col justify-center items-center text-center">
          <BsBrightnessAltHigh size={20} />
          <span className="text-xs" style={{ lineHeight: "0.9rem" }}>
            Keyboard Brightness
          </span>
        </div>
        <div
          className="control-grid p-2 flex flex-col justify-center items-center text-center cursor-default"
          onClick={() => this.props.toggleFullScreen(!this.props.fullscreen)}
        >
          {this.props.fullscreen ? (
            <BsFullscreenExit size={16} />
          ) : (
            <BsFullscreen size={16} />
          )}
          <span className="text-xs mt-1.5" style={{ lineHeight: "0.9rem" }}>
            {this.props.fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          </span>
        </div>
        <div className="control-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
          <span className="font-medium ml-0.5">Display</span>
          <SliderComponent
            icon={<IoSunny size={12} className="text-gray-500" />}
            value={this.props.brightness}
            setValue={this.props.setBrightness}
          />
        </div>
        <div className="control-grid col-span-4 bg-gray-200 bg-opacity-60 blur rounded-xl px-2.5 py-2 space-y-1 flex flex-col justify-around">
          <span className="font-medium ml-0.5">Sound</span>
          <SliderComponent
            icon={<IoVolumeHigh size={12} className="text-gray-500" />}
            value={this.props.volume}
            setValue={this.props.setVolume}
          />
        </div>
        <div className="control-grid col-span-4 bg-gray-200 bg-opacity-60 blur rounded-xl p-2 pr-4 flex flex-row justify-between items-center space-x-2.5">
          <img src={music.cover} alt="cover art" className="w-12 rounded-lg" />
          <div className="flex flex-col flex-grow justify-start">
            <span className="font-medium">{music.title}</span>
            <span className="text-xs text-gray-500">{music.artist}</span>
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

const mapStateToProps = (state: CCMRedux): CCMRedux => {
  return {
    dark: state.dark,
    wifi: state.wifi,
    brightness: state.brightness,
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
