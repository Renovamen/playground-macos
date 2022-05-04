import { useRef } from "react";
import type { RefObject } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import {
  toggleDark,
  toggleWIFI,
  toggleAirdrop,
  toggleBleutooth,
  toggleFullScreen
} from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { music } from "../../configs";
import { useClickOutside } from "../../hooks";

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
    <div className="slider flex w-full">
      <div className="h-7 p-2 bg-gray-100 rounded-l-full border-t border-l border-b border-gray-300 dark:(bg-gray-800 border-gray-600)">
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
    useAppSelector((state) => ({
      dark: state.system.dark,
      wifi: state.system.wifi,
      brightness: state.system.brightness,
      bluetooth: state.system.bluetooth,
      airdrop: state.system.airdrop,
      fullscreen: state.system.fullscreen,
      volume: state.system.volume
    }));
  const dispatch = useAppDispatch();

  useClickOutside(controlCenterRef, toggleControlCenter, [btnRef]);

  return (
    <div
      className="fixed base-shadow w-80 h-96 max-w-full top-8 right-0 sm:right-2 p-2.5 grid grid-cols-4 grid-rows-5 gap-2 bg-gray-100 bg-opacity-70 rounded-2xl text-black border border-gray-400 border-opacity-50 dark:(text-white bg-gray-800 bg-opacity-70 border-gray-500 border-opacity-50)"
      ref={controlCenterRef}
    >
      <div className="cc-grid row-span-2 col-span-2 p-2 flex flex-col justify-around">
        <div className="flex-center-v space-x-2">
          <MdWifi
            size={32}
            className={`${wifi ? "cc-btn" : "cc-btn-active"}`}
            onClick={() => dispatch(toggleWIFI(!wifi))}
          />
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">Wi-Fi</span>
            <span className="cc-text">{wifi ? "Home" : "Off"}</span>
          </div>
        </div>
        <div className="flex-center-v space-x-2">
          <FiBluetooth
            size={32}
            className={`${bluetooth ? "cc-btn" : "cc-btn-active"}`}
            onClick={() => dispatch(toggleBleutooth(!bluetooth))}
          />
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">Bluetooth</span>
            <span className="cc-text">{bluetooth ? "On" : "Off"}</span>
          </div>
        </div>
        <div className="flex-center-v space-x-2">
          <FiRss
            size={32}
            className={`${airdrop ? "cc-btn" : "cc-btn-active"}`}
            onClick={() => dispatch(toggleAirdrop(!airdrop))}
          />
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">AirDrop</span>
            <span className="cc-text">{airdrop ? "Contacts Only" : "Off"}</span>
          </div>
        </div>
      </div>
      <div className="cc-grid col-span-2 p-2 flex-center-v space-x-2">
        {dark ? (
          <IoMoon
            size={32}
            className="cc-mode"
            onClick={() => dispatch(toggleDark(false))}
          />
        ) : (
          <IoSunny
            size={32}
            className="cc-mode"
            onClick={() => dispatch(toggleDark(true))}
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium ml-1">
            {dark ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>
      <div className="cc-grid p-2 flex-center flex-col text-center">
        <BsBrightnessAltHigh size={20} />
        <span className="text-xs" style={{ lineHeight: "0.9rem" }}>
          Keyboard Brightness
        </span>
      </div>
      <div
        className="cc-grid p-2 flex-center flex-col text-center cursor-default"
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
      <div className="cc-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
        <span className="font-medium ml-0.5">Display</span>
        <SliderComponent
          icon={
            <IoSunny size={12} className="text-gray-500 dark:text-gray-400" />
          }
          value={brightness}
          setValue={setBrightness}
        />
      </div>
      <div className="cc-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
        <span className="font-medium ml-0.5">Sound</span>
        <SliderComponent
          icon={
            <IoVolumeHigh
              size={12}
              className="text-gray-500 dark:text-gray-400"
            />
          }
          value={volume}
          setValue={setVolume}
        />
      </div>
      <div className="cc-grid col-span-4 p-2 pr-4 flex-center-v flex-row justify-between space-x-2.5">
        <img src={music.cover} alt="cover art" className="w-12 rounded-lg" />
        <div className="flex flex-col flex-grow justify-start">
          <span className="font-medium">{music.title}</span>
          <span className="cc-text">{music.artist}</span>
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
