import React, { Component } from "react";
import format from "date-fns/format";
import AppleMenu from "./AppleMenu";
import ControlCenterMenu from "./ControlCenterMenu";
import {
  enterFullScreen,
  exitFullScreen,
  isFullScreen
} from "../../utils/screen";

// ------- import icons -------
import { BsBatteryFull } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";

const MenuItem = ({
  children,
  onClick,
  hideOnMobile = false,
  forceHover = false
}) => {
  const hide = hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const hover = forceHover
    ? "bg-white bg-opacity-30"
    : "hover:bg-white hover:bg-opacity-30 rounded";
  return (
    <div
      className={`${hide} cursor-default flex-row space-x-1 ${hover} p-1`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showControlCenter: false,
      showAppleMen: false,
      playing: false,
      volume: 100,
      brightness: Math.floor(Math.random() * 100),
      btn: {
        wifi: true,
        bluetooth: true,
        airdrop: true
      },
      fullscreen: false,
      intervalId: null
    };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.resize.bind(this);
  }

  componentDidMount() {
    // current date and time
    const intervalId = setInterval(() => {
      this.setState({
        data: new Date()
      });
    }, 60 * 1000);
    // store intervalId in the state, so we can clear interval later
    this.setState({ intervalId: intervalId });

    // listen to screen size change
    window.addEventListener("resize", this.resize);

    // load music
    this.audio = new Audio("music/sunflower.mp3");
    this.audio.load();
    // auto replay
    this.audio.addEventListener("ended", () => this.audio.play());
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    window.removeEventListener("resize", this.resize);
    this.audio.removeEventListener("ended", () => this.audio.play());
  }

  resize = () => {
    const isFull = isFullScreen();
    this.setState({
      fullscreen: isFull
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

  toggleBtn = (name) => {
    let btn = this.state.btn;
    btn[name] = !btn[name];
    this.setState({
      btn: btn
    });
  };

  toggleAudio = (target) => {
    this.setState({ playing: target }, () => {
      this.state.playing ? this.audio.play() : this.audio.pause();
    });
  };

  toggleFullScreen = (target) => {
    this.setState({ fullscreen: target }, () => {
      this.state.fullscreen ? enterFullScreen() : exitFullScreen();
    });
  };

  logout = () => {
    Promise.all([
      this.toggleFullScreen(false),
      this.toggleAudio(false),
      this.setVolume(100)
    ]).then(() => this.props.setLogin(false));
  };

  render() {
    return (
      <div className="nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition">
        <div className="flex flex-row items-center space-x-4">
          <MenuItem
            forceHover={this.state.showAppleMenu}
            onClick={() =>
              this.setState({
                showAppleMenu: !this.state.showAppleMenu
              })
            }
          >
            <AiFillApple size={18} />
          </MenuItem>
          <span className="cursor-default font-semibold">
            {this.props.title}
          </span>
        </div>

        {/* Open this when clicking on Apple logo */}
        {this.state.showAppleMenu && (
          <AppleMenu
            logout={this.logout}
            shut={this.props.shutMac}
            restart={this.props.restartMac}
            sleep={this.props.sleepMac}
          />
        )}

        <div className="flex flex-row justify-end items-center space-x-2">
          <MenuItem hideOnMobile={true}>
            <span className="text-xs mt-0.5 mr-1">100%</span>
            <BsBatteryFull size={20} />
          </MenuItem>
          <MenuItem hideOnMobile={true}>
            <FaWifi size={17} />
          </MenuItem>
          <MenuItem hideOnMobile={true}>
            <BiSearch size={17} />
          </MenuItem>
          <MenuItem
            onClick={() =>
              this.setState({
                showControlCenter: !this.state.showControlCenter
              })
            }
          >
            <img
              className="w-4 h-4 filter-invert"
              src="img/icons/menu/controlcenter.png"
              alt="control center"
            />
          </MenuItem>

          {/* Open this when clicking on Control Center button */}
          {this.state.showControlCenter && (
            <ControlCenterMenu
              dark={this.props.dark}
              audio={this.audio}
              playing={this.state.playing}
              volume={this.state.volume}
              brightness={this.state.brightness}
              btn={this.state.btn}
              fullscreen={this.state.fullscreen}
              setDark={this.props.setDark}
              toggleAudio={this.toggleAudio}
              setVolume={this.setVolume}
              setBrightness={this.setBrightness}
              toggleBtn={this.toggleBtn}
              toggleFullScreen={this.toggleFullScreen}
            />
          )}

          <span>{format(this.state.date, "eee d MMM h:mm aa")}</span>
        </div>
      </div>
    );
  }
}
