import React, { forwardRef, useState, useEffect, useRef } from "react";
import type { RefObject, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";

import type { MacActions, RootReduxState } from "../../types";
import AppleMenu from "./AppleMenu";
import WifiMenu from "./WifiMenu";
import Battery from "./Battery";
import ControlCenterMenu from "./ControlCenterMenu";
import { isFullScreen } from "../../utils";
import { setVolume, setBrightness, toggleFullScreen } from "../../redux/action";
import { music } from "../../configs";
import { useAudio, useWindowSize, useInterval } from "../../hooks";

// ------- import icons -------
import { BiSearch } from "react-icons/bi";
import { MdWifi, MdWifiOff } from "react-icons/md";
import { RiAppleFill } from "react-icons/ri";

interface TopBarItemProps {
  hideOnMobile?: boolean;
  forceHover?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const TopBarItem = forwardRef((props: TopBarItemProps, ref: any) => {
  const hide = props.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const hover = props.forceHover
    ? "bg-white bg-opacity-30"
    : "hover:bg-white hover:bg-opacity-30 rounded";
  return (
    <div
      ref={ref}
      className={`${hide} h-6 cursor-default flex-row space-x-1 ${hover} p-1`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});
TopBarItem.displayName = "TopBarItem";

const CCMIcon = ({ size }: { size: number }) => {
  return (
    <svg
      viewBox="0 0 29 29"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M7.5,13h14a5.5,5.5,0,0,0,0-11H7.5a5.5,5.5,0,0,0,0,11Zm0-9h14a3.5,3.5,0,0,1,0,7H7.5a3.5,3.5,0,0,1,0-7Zm0,6A2.5,2.5,0,1,0,5,7.5,2.5,2.5,0,0,0,7.5,10Zm14,6H7.5a5.5,5.5,0,0,0,0,11h14a5.5,5.5,0,0,0,0-11Zm1.43439,8a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,22.93439,24Z" />
    </svg>
  );
};

interface TopBarProps extends MacActions {
  title: string;
  setSpotlightBtnRef: (value: RefObject<HTMLDivElement>) => void;
  hide: boolean;
  toggleSpotlight: () => void;
}

interface TopBarState {
  date: Date;
  showControlCenter: boolean;
  showWifiMenu: boolean;
  showAppleMenu: boolean;
}

const TopBar = (props: TopBarProps) => {
  const appleBtnRef = useRef<HTMLDivElement>(null);
  const controlCenterBtnRef = useRef<HTMLDivElement>(null);
  const wifiBtnRef = useRef<HTMLDivElement>(null);
  const spotlightBtnRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<TopBarState>({
    date: new Date(),
    showControlCenter: false,
    showWifiMenu: false,
    showAppleMenu: false
  });

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [audio, audioState, controls, audioRef] = useAudio({
    src: music.audio,
    autoReplay: true
  });
  const { winWidth, winHeight } = useWindowSize();

  const { volume, wifi } = useSelector((state: RootReduxState) => ({
    volume: state.volume,
    wifi: state.wifi
  }));
  const dispatch = useDispatch();

  useInterval(() => {
    setState({
      ...state,
      date: new Date()
    });
  }, 60 * 1000);

  useEffect(() => {
    props.setSpotlightBtnRef(spotlightBtnRef);
    controls.volume(volume / 100);
  }, []);

  useEffect(() => {
    const isFull = isFullScreen();
    dispatch(toggleFullScreen(isFull));
  }, [winWidth, winHeight]);

  const setAudioVolume = (value: number): void => {
    dispatch(setVolume(value));
    controls.volume(value / 100);
  };

  const setSiteBrightness = (value: number): void => {
    dispatch(setBrightness(value));
  };

  const toggleControlCenter = (): void => {
    setState({
      ...state,
      showControlCenter: !state.showControlCenter
    });
  };

  const toggleAppleMenu = (): void => {
    setState({
      ...state,
      showAppleMenu: !state.showAppleMenu
    });
  };

  const toggleWifiMenu = (): void => {
    setState({
      ...state,
      showWifiMenu: !state.showWifiMenu
    });
  };

  const logout = (): void => {
    controls.pause();
    props.setLogin(false);
  };

  const shut = (e: React.MouseEvent<HTMLLIElement>): void => {
    controls.pause();
    props.shutMac(e);
  };

  const restart = (e: React.MouseEvent<HTMLLIElement>): void => {
    controls.pause();
    props.restartMac(e);
  };

  const sleep = (e: React.MouseEvent<HTMLLIElement>): void => {
    controls.pause();
    props.sleepMac(e);
  };

  return (
    <div
      className={`nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center ${
        props.hide ? "z-0" : "z-20"
      } text-sm text-white bg-gray-500 bg-opacity-10 backdrop-blur-2xl shadow transition`}
    >
      <div className="flex flex-row items-center space-x-4">
        <TopBarItem
          forceHover={state.showAppleMenu}
          onClick={() => toggleAppleMenu()}
          ref={appleBtnRef}
        >
          <RiAppleFill size={16} />
        </TopBarItem>
        <span className="cursor-default font-semibold">{props.title}</span>
      </div>

      {/* Open this when clicking on Apple logo */}
      {state.showAppleMenu && (
        <AppleMenu
          logout={logout}
          shut={shut}
          restart={restart}
          sleep={sleep}
          toggleAppleMenu={toggleAppleMenu}
          btnRef={appleBtnRef}
        />
      )}

      <div className="flex flex-row justify-end items-center space-x-2">
        <TopBarItem hideOnMobile={true}>
          <Battery />
        </TopBarItem>
        <TopBarItem
          hideOnMobile={true}
          onClick={toggleWifiMenu}
          ref={wifiBtnRef}
        >
          {wifi ? <MdWifi size={18} /> : <MdWifiOff size={18} />}
        </TopBarItem>
        <TopBarItem ref={spotlightBtnRef} onClick={props.toggleSpotlight}>
          <BiSearch size={17} />
        </TopBarItem>
        <TopBarItem onClick={toggleControlCenter} ref={controlCenterBtnRef}>
          <CCMIcon size={16} />
        </TopBarItem>

        {/* Open this when clicking on Wifi button */}
        {state.showWifiMenu && (
          <WifiMenu toggleWifiMenu={toggleWifiMenu} btnRef={wifiBtnRef} />
        )}

        {/* Open this when clicking on Control Center button */}
        {state.showControlCenter && (
          <ControlCenterMenu
            playing={audioState.playing}
            toggleAudio={controls.toggle}
            setVolume={setAudioVolume}
            setBrightness={setSiteBrightness}
            toggleControlCenter={toggleControlCenter}
            btnRef={controlCenterBtnRef}
          />
        )}

        <span>{format(state.date, "eee MMM d")}</span>
        <span>{format(state.date, "h:mm aa")}</span>
      </div>
    </div>
  );
};

export default TopBar;
