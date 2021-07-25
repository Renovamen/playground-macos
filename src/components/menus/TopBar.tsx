import React, { Component, createRef, forwardRef } from "react";
import { connect } from "react-redux";
import format from "date-fns/format";

import { macActions } from "../../types";
import AppleMenu from "./AppleMenu";
import WifiMenu from "./WifiMenu";
import ControlCenterMenu from "./ControlCenterMenu";
import { isFullScreen } from "../../utils/screen";
import { setVolume, setBrightness, toggleFullScreen } from "../../redux/action";
import music from "../../configs/music";

// ------- import icons -------
import { BsBatteryFull } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { RiSignalWifiLine } from "react-icons/ri";
import { AiFillApple } from "react-icons/ai";

interface TopBarItemProps {
  hideOnMobile?: boolean;
  forceHover?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const TopBarItem = forwardRef((props: TopBarItemProps, ref: any) => {
  const hide = props.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const hover = props.forceHover
    ? "bg-white bg-opacity-30"
    : "hover:bg-white hover:bg-opacity-30 rounded";
  return (
    <div
      ref={ref}
      className={`${hide} cursor-default flex-row space-x-1 ${hover} p-1`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});

interface TopBarRedux {
  volume: number;
  brightness: number;
  wifi: boolean;
}

interface TopBarProps extends macActions, TopBarRedux {
  title: string;
  setVolume: Function;
  toggleFullScreen: Function;
  setBrightness: Function;
  setSpotlightBtnRef: (value: React.RefObject<HTMLDivElement>) => void;
  hide: boolean;
  toggleSpotlight: () => void;
}

interface TopBarState {
  date: Date;
  showControlCenter: boolean;
  showWifiMenu: boolean;
  showAppleMenu: boolean;
  playing: boolean;
}

class TopBar extends Component<TopBarProps, TopBarState> {
  private intervalId = null as any;
  private appleBtnRef = createRef<any>();
  private controlCenterBtnRef = createRef<any>();
  private wifiBtnRef = createRef<any>();
  private spotlightBtnRef = createRef<any>();
  private audio = new Audio();

  constructor(props: TopBarProps) {
    super(props);
    this.state = {
      date: new Date(),
      showControlCenter: false,
      showWifiMenu: false,
      showAppleMenu: false,
      playing: false
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.resize.bind(this);
  }

  componentDidMount() {
    this.props.setSpotlightBtnRef(this.spotlightBtnRef);

    // current date and time
    // store intervalId in the state, so we can clear interval later
    this.intervalId = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 60 * 1000);

    // listen to screen size change
    window.addEventListener("resize", this.resize);

    // load music
    this.audio = new Audio(music.audio);
    this.audio.load();

    // set volume
    this.audio.volume = this.props.volume / 100;

    // auto replay
    this.audio.addEventListener("ended", () => this.audio.play());
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    window.removeEventListener("resize", this.resize);
    this.audio.removeEventListener("ended", () => this.audio.play());
  }

  resize = (): void => {
    const isFull = isFullScreen();
    this.props.toggleFullScreen(isFull);
  };

  toggleAudio = (target: boolean): void => {
    target ? this.audio.play() : this.audio.pause();
    this.setState({ playing: target });
  };

  setVolume = (value: number): void => {
    this.props.setVolume(value);
    this.audio.volume = value / 100;
  };

  setBrightness = (value: number): void => {
    this.props.setBrightness(value);
  };

  toggleControlCenter = (): void => {
    this.setState({
      showControlCenter: !this.state.showControlCenter
    });
  };

  toggleAppleMenu = (): void => {
    this.setState({
      showAppleMenu: !this.state.showAppleMenu
    });
  };

  toggleWifiMenu = (): void => {
    this.setState({
      showWifiMenu: !this.state.showWifiMenu
    });
  };

  logout = (): void => {
    this.toggleAudio(false);
    this.props.setLogin(false);
  };

  shut = (e: React.MouseEvent<HTMLLIElement>): void => {
    this.toggleAudio(false);
    this.props.shutMac(e);
  };

  restart = (e: React.MouseEvent<HTMLLIElement>): void => {
    this.toggleAudio(false);
    this.props.restartMac(e);
  };

  sleep = (e: React.MouseEvent<HTMLLIElement>): void => {
    this.toggleAudio(false);
    this.props.sleepMac(e);
  };

  render() {
    return (
      <div
        className={`nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center ${
          this.props.hide ? "z-0" : "z-20"
        } text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition`}
      >
        <div className="flex flex-row items-center space-x-4">
          <TopBarItem
            forceHover={this.state.showAppleMenu}
            onClick={() => this.toggleAppleMenu()}
            ref={this.appleBtnRef}
          >
            <AiFillApple size={18} />
          </TopBarItem>
          <span className="cursor-default font-semibold">
            {this.props.title}
          </span>
        </div>

        {/* Open this when clicking on Apple logo */}
        {this.state.showAppleMenu && (
          <AppleMenu
            logout={this.logout}
            shut={this.shut}
            restart={this.restart}
            sleep={this.sleep}
            toggleAppleMenu={this.toggleAppleMenu}
            btnRef={this.appleBtnRef}
          />
        )}

        <div className="flex flex-row justify-end items-center space-x-2">
          <TopBarItem hideOnMobile={true}>
            <span className="text-xs mt-0.5 mr-1">100%</span>
            <BsBatteryFull size={20} />
          </TopBarItem>
          <TopBarItem
            hideOnMobile={true}
            onClick={this.toggleWifiMenu}
            ref={this.wifiBtnRef}
          >
            {this.props.wifi ? (
              <FaWifi size={17} />
            ) : (
              <RiSignalWifiLine size={17} />
            )}
          </TopBarItem>
          <TopBarItem
            ref={this.spotlightBtnRef}
            onClick={this.props.toggleSpotlight}
          >
            <BiSearch size={17} />
          </TopBarItem>
          <TopBarItem
            onClick={this.toggleControlCenter}
            ref={this.controlCenterBtnRef}
          >
            <img
              className="w-4 h-4 filter invert"
              src="img/icons/menu/controlcenter.png"
              alt="control center"
            />
          </TopBarItem>

          {/* Open this when clicking on Wifi button */}
          {this.state.showWifiMenu && (
            <WifiMenu
              toggleWifiMenu={this.toggleWifiMenu}
              btnRef={this.wifiBtnRef}
            />
          )}

          {/* Open this when clicking on Control Center button */}
          {this.state.showControlCenter && (
            <ControlCenterMenu
              playing={this.state.playing}
              toggleAudio={this.toggleAudio}
              setVolume={this.setVolume}
              setBrightness={this.setBrightness}
              toggleControlCenter={this.toggleControlCenter}
              btnRef={this.controlCenterBtnRef}
            />
          )}

          <span>{format(this.state.date, "eee MMM d")}</span>
          <span>{format(this.state.date, "h:mm aa")}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TopBarRedux): TopBarRedux => {
  return {
    volume: state.volume,
    brightness: state.brightness,
    wifi: state.wifi
  };
};

export default connect(mapStateToProps, {
  setVolume,
  setBrightness,
  toggleFullScreen
})(TopBar);
