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
} from "~/redux/slices";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { music } from "~/configs";
import { useClickOutside } from "~/hooks";

interface SliderProps {
  icon: string;
  value: number;
  setValue: (value: number) => void;
}

const SliderComponent = ({ icon, value, setValue }: SliderProps) => {
  return (
    <div className="slider flex w-full">
      <div
        className="w-7 h-7 flex-center c-bg-100 c-border-300"
        border="t l b rounded-l-full"
      >
        <span className={`${icon} c-text-500 text-xs`} />
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
      className="fixed grid shadow-menu w-80 h-96 max-w-full top-9.5 right-0 sm:right-1.5 p-2.5 c-text-black c-bg-100/70 border rounded-2xl menu-border"
      grid="cols-4 rows-5 gap-2"
      ref={controlCenterRef}
    >
      <div className="cc-grid row-span-2 col-span-2 p-2 flex flex-col justify-around">
        <div className="hstack space-x-2">
          <div
            className={`${wifi ? "cc-btn" : "cc-btn-active"}`}
            onClick={() => dispatch(toggleWIFI(!wifi))}
          >
            <span className="i-material-symbols:wifi text-base" />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">Wi-Fi</span>
            <span className="cc-text">{wifi ? "Home" : "Off"}</span>
          </div>
        </div>
        <div className="hstack space-x-2">
          <div
            className={`${bluetooth ? "cc-btn" : "cc-btn-active"}`}
            onClick={() => dispatch(toggleBleutooth(!bluetooth))}
          >
            <span className="i-charm:bluetooth text-base" />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">Bluetooth</span>
            <span className="cc-text">{bluetooth ? "On" : "Off"}</span>
          </div>
        </div>
        <div className="hstack space-x-2">
          <div
            className={`${airdrop ? "cc-btn" : "cc-btn-active"}`}
            onClick={() => dispatch(toggleAirdrop(!airdrop))}
          >
            <span className="i-material-symbols:rss-feed-rounded text-base" />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="font-medium leading-4">AirDrop</span>
            <span className="cc-text">{airdrop ? "Contacts Only" : "Off"}</span>
          </div>
        </div>
      </div>
      <div className="cc-grid col-span-2 p-2 hstack space-x-2">
        <div
          className={`${dark ? "cc-btn" : "cc-btn-active"}`}
          onClick={() => dispatch(toggleDark(!dark))}
        >
          {dark ? (
            <span className="i-ion:moon text-base" />
          ) : (
            <span className="i-ion:sunny text-base" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium ml-1">
            {dark ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>
      <div className="cc-grid p-2 flex-center flex-col text-center">
        <span className="i-bi:brightness-alt-high text-xl" />
        <span className="text-xs leading-3.5">Keyboard Brightness</span>
      </div>
      <div
        className="cc-grid p-2 flex-center flex-col text-center cursor-default"
        onClick={() => dispatch(toggleFullScreen(!fullscreen))}
      >
        {fullscreen ? (
          <span className="i-bi:fullscreen-exit text-base" />
        ) : (
          <span className="i-bi:fullscreen text-base" />
        )}
        <span className="text-xs leading-3.5 mt-1.5">
          {fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        </span>
      </div>
      <div className="cc-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
        <span className="font-medium ml-0.5">Display</span>
        <SliderComponent
          icon="i-ion:sunny"
          value={brightness}
          setValue={setBrightness}
        />
      </div>
      <div className="cc-grid col-span-4 px-2.5 py-2 space-y-1 flex flex-col justify-around">
        <span className="font-medium ml-0.5">Sound</span>
        <SliderComponent
          icon="i-ion:volume-high"
          value={volume}
          setValue={setVolume}
        />
      </div>
      <div className="cc-grid col-span-4 p-2 pr-4 hstack flex-row justify-between space-x-2.5">
        <img src={music.cover} alt="cover art" className="w-12 rounded-lg" />
        <div className="flex flex-col flex-grow justify-start">
          <span className="font-medium">{music.title}</span>
          <span className="cc-text">{music.artist}</span>
        </div>
        {playing ? (
          <span
            className="i-bi:pause-fill text-2xl"
            onClick={() => toggleAudio(false)}
          />
        ) : (
          <span
            className="i-bi:play-fill text-2xl"
            onClick={() => toggleAudio(true)}
          />
        )}
      </div>
    </div>
  );
}
