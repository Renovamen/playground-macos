import React, { Component } from "react";
import { connect } from "react-redux";
import nightwind from "nightwind/helper";

import { macActions } from "../types";
import TopBar from "../components/menus/TopBar";
import Dock from "../components/dock/Dock";
import Launchpad from "../components/Launchpad";
import Window from "../components/Window";
import Spotlight from "../components/Spotlight";
import apps from "../configs/apps";
import wallpapers from "../configs/wallpapers";

type DesktopRedux = {
  dark?: boolean;
  brightness?: number;
};

type DesktopProps = DesktopRedux & macActions;

interface DesktopState {
  showApps: {
    [key: string]: boolean;
  };
  appsZ: {
    [key: string]: number;
  };
  maxApps: {
    [key: string]: boolean;
  };
  minApps: {
    [key: string]: boolean;
  };
  maxZ: number;
  showLaunchpad: boolean;
  currentTitle: string;
  hideDockAndTopbar: boolean;
  spotlight: boolean;
  spotlightBtnRef: any;
}

const minMarginY = 24;

class Desktop extends Component<DesktopProps, DesktopState> {
  constructor(props: DesktopProps) {
    super(props);
    this.state = {
      showApps: {},
      appsZ: {},
      maxApps: {},
      minApps: {},
      maxZ: 2,
      showLaunchpad: false,
      currentTitle: "Finder",
      hideDockAndTopbar: false,
      spotlight: false,
      spotlightBtnRef: null
    };
  }

  componentDidMount() {
    this.getAppsData();
  }

  getAppsData = (): void => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: app.show
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2
      };
      maxApps = {
        ...maxApps,
        [app.id]: false
      };
      minApps = {
        ...minApps,
        [app.id]: false
      };
    });

    this.setState({ showApps });
  };

  toggleLaunchpad = (target: boolean): void => {
    let r = document.querySelector(`#launchpad`) as HTMLElement;
    if (target) {
      r.style.transform = "scale(1)";
      r.style.transition = "ease-in 0.2s";
    } else {
      r.style.transform = "scale(1.1)";
      r.style.transition = "ease-out 0.2s";
    }

    this.setState({ showLaunchpad: target });
  };

  toggleSpotlight = (): void => {
    this.setState({ spotlight: !this.state.spotlight });
  };

  setWinowsPosition = (id: string): void => {
    let r = document.querySelector(`#window-${id}`) as HTMLElement;
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      // "+ window.innerWidth" because of the boundary for windows
      (window.innerWidth + rect.x).toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      // "- minMarginY" because of the boundary for windows
      (rect.y - minMarginY).toFixed(1).toString() + "px"
    );
  };

  closeApp = (id: string): void => {
    this.setAppMax(id, false);
    let showApps = this.state.showApps;
    showApps[id] = false;
    this.setState({
      showApps: showApps,
      hideDockAndTopbar: false
    });
  };

  openApp = (id: string): void => {
    // add it to the shown app list
    let showApps = this.state.showApps;
    showApps[id] = true;

    // move to the top (use a maximum z-index)
    let appsZ = this.state.appsZ;
    let maxZ = this.state.maxZ + 1;
    appsZ[id] = maxZ;

    // get the title of the currently opened app
    const currentApp = apps.find((app) => {
      return app.id === id;
    });
    if (currentApp === undefined) {
      throw new TypeError(`App ${id} is undefined.`);
    }

    this.setState({
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ,
      currentTitle: currentApp.title
    });

    let minApps = this.state.minApps;
    // if the app has already been shown but minimized
    if (minApps[id]) {
      // move to window's last position
      let r = document.querySelector(`#window-${id}`) as HTMLElement;
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      // remove it from the minimized app list
      minApps[id] = false;
      this.setState({ minApps });
    }
  };

  setAppMax = (id: string, target?: boolean): void => {
    let maxApps = this.state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    this.setState({
      maxApps: maxApps,
      hideDockAndTopbar: target
    });
  };

  setAppMin = (id: string, target?: boolean): void => {
    let minApps = this.state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    this.setState({
      minApps: minApps
    });
  };

  minimizeApp = (id: string): void => {
    this.setWinowsPosition(id);

    // get the corrosponding dock icon's position
    var r = document.querySelector(`#dock-${id}`) as HTMLElement;
    const dockAppRect = r.getBoundingClientRect();

    r = document.querySelector(`#window-${id}`) as HTMLElement;
    // const appRect = r.getBoundingClientRect();
    const posY = window.innerHeight - r.offsetHeight / 2 - minMarginY;
    // "+ window.innerWidth" because of the boundary for windows
    const posX = window.innerWidth + dockAppRect.x - r.offsetWidth / 2 + 25;

    // translate the window to that position
    r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`;
    r.style.transition = "ease-out 0.3s";

    // add it to the minimized app list
    this.setAppMin(id, true);
  };

  renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && this.state.showApps[app.id]) {
        const props = {
          title: app.title,
          id: app.id,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          z: this.state.appsZ[app.id],
          max: this.state.maxApps[app.id],
          min: this.state.minApps[app.id],
          close: this.closeApp,
          setMax: this.setAppMax,
          setMin: this.minimizeApp,
          focus: this.openApp
        };

        return (
          <Window key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </Window>
        );
      } else {
        return <div key={`desktop-app-${app.id}`} />;
      }
    });
  };

  render() {
    return (
      <div
        className="w-full h-full overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            this.props.dark ? wallpapers.night : wallpapers.day
          })`,
          filter: `brightness( ${
            (this.props.brightness as number) * 0.7 + 50
          }% )`
        }}
      >
        {/* Dark Model Toggler */}
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />

        {/* Top Menu Bar */}
        <TopBar
          title={this.state.currentTitle}
          setLogin={this.props.setLogin}
          shutMac={this.props.shutMac}
          sleepMac={this.props.sleepMac}
          restartMac={this.props.restartMac}
          toggleSpotlight={this.toggleSpotlight}
          hide={this.state.hideDockAndTopbar}
          setSpotlightBtnRef={(value: React.RefObject<HTMLDivElement>) => {
            this.setState({
              spotlightBtnRef: value
            });
          }}
        />

        {/* Desktop Apps */}
        <div className="window-bound z-10 absolute" style={{ top: minMarginY }}>
          {this.renderAppWindows()}
        </div>

        {/* Spotlight */}
        {this.state.spotlight && (
          <Spotlight
            openApp={this.openApp}
            toggleLaunchpad={this.toggleLaunchpad}
            toggleSpotlight={this.toggleSpotlight}
            btnRef={this.state.spotlightBtnRef}
          />
        )}

        {/* Launchpad */}
        <Launchpad
          show={this.state.showLaunchpad}
          toggleLaunchpad={this.toggleLaunchpad}
        />

        {/* Dock */}
        <Dock
          open={this.openApp}
          showApps={this.state.showApps}
          showLaunchpad={this.state.showLaunchpad}
          toggleLaunchpad={this.toggleLaunchpad}
          hide={this.state.hideDockAndTopbar}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: DesktopRedux): DesktopRedux => {
  return {
    dark: state.dark,
    brightness: state.brightness
  };
};

export default connect(mapStateToProps, null)(Desktop);
