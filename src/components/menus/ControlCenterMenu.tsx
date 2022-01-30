import { useRef } from "react";
import type { RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import {
  toggleDark,
  toggleWIFI,
  toggleAirdrop,
  toggleBleutooth,
  toggleFullScreen
} from "../../redux/action";
import { music } from "../../configs";
import { useClickOutside } from "../../hooks";
import type { RootReduxState } from "../../types";

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
import { MdWifi } from "react-icons/md";

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

interface CCMProps {
  toggleControlCenter: () => void;
  toggleAudio: (target: boolean) => void;
  setBrightness: (value: number) => void;
  setVolume: (value: number) => void;
  playing: boolean;
  btnRef: RefObject<HTMLDivElement>;
}

export default function ControlCenterMenu({
  toggleControlCenter,
  toggleAudio,
  setBrightness,
  setVolume,
  playing,
  btnRef
}: CCMProps) {
  const controlCenterRef = useRef<HTMLDivElement>(null);
  const { dark, wifi, brightness, bluetooth, airdrop, fullscreen, volume } =
    useSelector((state: RootReduxState) => ({
      dark: state.dark,
      wifi: state.wifi,
      brightness: state.brightness,
      bluetooth: state.bluetooth,
      airdrop: state.airdrop,
      fullscreen: state.fullscreen,
      volume: state.volume
    }));
  const dispatch = useDispatch();

  useClickOutside(controlCenterRef, toggleControlCenter, [btnRef]);

  return (
    <div
      className="fixed w-80 h-96 max-w-full top-8 right-0 sm:right-2 p-2.5 grid grid-cols-4 grid-rows-5 gap-2 bg-gray-100 bg-opacity-70 rounded-2xl text-black border border-gray-400 border-opacity-50"
      style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)" }}
      ref={controlCenterRef}
    >
      <div className="control-grid row-span-2 col-span-2 p-2 flex flex-col justify-around">
        <div className="flex flex-row items-center space-x-2">
          <MdWifi
            size={32}
            className={`${
              wifi
                ? "bg-blue-500 text-white"
                : "bg-gray-400 bg-opacity-25 text-gray-700"
            } rounded-full p-2`}
            onClick={() => dispatch(toggleWIFI(!wifi))}
          />
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">Wi-Fi</span>
            <span className="text-xs text-gray-500">
              {wifi ? "Home" : "Off"}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <FiBluetooth
            size={32}
            className={`${
              bluetooth
                ? "bg-blue-500 text-white"
                : "bg-gray-400 bg-opacity-25 text-gray-700"
            } rounded-full p-2`}
            onClick={() => dispatch(toggleBleutooth(!bluetooth))}
          />
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">Bluetooth</span>
            <span className="text-xs text-gray-500">
              {bluetooth ? "On" : "Off"}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <FiRss
            size={32}
            className={`${
              airdrop
                ? "bg-blue-500 text-white"
                : "bg-gray-400 bg-opacity-25 text-gray-700"
            } rounded-full p-2`}
            onClick={() => dispatch(toggleAirdrop(!airdrop))}
          />
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">AirDrop</span>
            <span className="text-xs text-gray-500">
              {airdrop ? "Contacts Only" : "Off"}
            </span>
          </div>
        </div>
      </div>
      <div className="control-grid col-span-2 p-2 flex flex-row items-center space-x-2">
        {dark ? (
          <IoMoon
            size={32}
            className="text-gray-700 bg-gray-400 bg-opacity-25 rounded-full p-2"
            onClick={() => dispatch(toggleDark(false))}
          />
        ) : (
          <IoSunny
            size={32}
            className="text-gray-700 bg-gray-400 bg-opacity-25 rounded-full p-2"
            onClick={() => dispatch(toggleDark(true))}
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium ml-1">
            {dark ? "Dark Mode" : "Light Mode"}
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
        onClick={() => dispatch(toggleFullScreen(!fullscreen))}
      >
        {fullscreen ? (
          <BsFullscreenExit size={16} />
        ) : (
          <BsFullscreen size={16} />
        )}
        <span className="text-xs mt-1.5" style={{ lineHeight: "0.9rem" }}>
          {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </span>
      </div>
      <div className="control-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
        <span className="font-medium ml-0.5">Display</span>
        <SliderComponent
          icon={<IoSunny size={12} className="text-gray-500" />}
          value={brightness}
          setValue={setBrightness}
        />
      </div>
      <div className="control-grid col-span-4 bg-gray-200 bg-opacity-60 rounded-xl px-2.5 py-2 space-y-1 flex flex-col justify-around">
        <span className="font-medium ml-0.5">Sound</span>
        <SliderComponent
          icon={<IoVolumeHigh size={12} className="text-gray-500" />}
          value={volume}
          setValue={setVolume}
        />
      </div>
      <div className="control-grid col-span-4 bg-gray-200 bg-opacity-60 rounded-xl p-2 pr-4 flex flex-row justify-between items-center space-x-2.5">
        <img src={music.cover} alt="cover art" className="w-12 rounded-lg" />
        <div className="flex flex-col flex-grow justify-start">
          <span className="font-medium">{music.title}</span>
          <span className="text-xs text-gray-500">{music.artist}</span>
        </div>
        {playing ? (
          <BsPauseFill onClick={() => toggleAudio(false)} size={24} />
        ) : (
          <BsPlayFill onClick={() => toggleAudio(true)} size={24} />
        )}
      </div>
    </div>
  );
}
