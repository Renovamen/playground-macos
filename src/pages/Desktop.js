import React, { Component } from "react";
import nightwind from "nightwind/helper";

import MenuBar from "../components/topbar/MenuBar";
import Dock from "../components/dock/Dock";
import Launchpad from "../components/Launchpad";
import Window from "../components/Window";
import apps from "../configs/apps";
import wallpapers from "../configs/wallpapers";

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApps: {},
      appsZ: {},
      maxApps: {},
      minApps: {},
      maxZ: 2,
      showLaunchpad: false,
      currentTitle: "Finder",
      hiddeDock: false
    };
  }

  componentDidMount() {
    this.getAppsData();
  }

  getAppsData = () => {
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

  toggleLaunchpad = (target) => {
    if (target === undefined) target = !this.state.showLaunchpad;

    var r = document.querySelector(`#launchpad`);
    if (target) {
      r.style.transform = "scale(1)";
      r.style.transition = "ease-in 0.2s";
    } else {
      r.style.transform = "scale(1.1)";
      r.style.transition = "ease-out 0.2s";
    }

    this.setState({ showLaunchpad: target });
  };

  setWinowsPosition = (id) => {
    var r = document.querySelector(`#window-${id}`);
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      rect.x.toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      rect.y.toFixed(1).toString() + "px"
    );
  };

  closeApp = (id) => {
    let showApps = this.state.showApps;
    showApps[id] = false;
    this.setState({ showApps });
  };

  openApp = (id) => {
    // add it to the shown app list
    let showApps = this.state.showApps;
    showApps[id] = true;

    // move to the top (use a maximum z-index)
    let appsZ = this.state.appsZ;
    let maxZ = this.state.maxZ + 1;
    appsZ[id] = maxZ;

    this.setState({
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ,
      currentTitle: apps.find((app) => {
        return app.id === id;
      }).title
    });

    let minApps = this.state.minApps;
    // if the app has already been shown but minimized
    if (minApps[id]) {
      // move to window's last position
      var r = document.querySelector(`#window-${id}`);
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      // remove it from the minimized app list
      minApps[id] = false;
      this.setState({ minApps });
    }
  };

  setAppMax = (id, target) => {
    let maxApps = this.state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    this.setState({
      maxApps: maxApps,
      hiddeDock: target
    });
  };

  setAppMin = (id, target) => {
    let minApps = this.state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    this.setState({
      minApps: minApps
    });
  };

  minimizeApp = (id) => {
    const posy = 380;

    this.setWinowsPosition(id);

    // get the corrosponding dock icon's position
    var r = document.querySelector(`#dock-${id}`);
    const dockApp = r.getBoundingClientRect();

    r = document.querySelector(`#window-${id}`);
    // translate the window to that position
    r.style.transform = `translate(${
      dockApp.x.toFixed(1) - 290
    }px, ${posy}px) scale(0.2)`;
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
        className="w-screen h-screen overflow-hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(${
            this.props.dark ? wallpapers.night : wallpapers.day
          })`
        }}
      >
        {/* Dark Model Toggler */}
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />

        {/* Top Menu Bar */}
        <MenuBar
          title={this.state.currentTitle}
          dark={this.props.dark}
          setDark={this.props.setDark}
          setlogon={this.props.setlogon}
        />

        {/* Desktop Apps */}
        {this.renderAppWindows()}

        {/* Launchpad */}
        {/* {this.state.showLaunchpad && <Launchpad dark={this.props.dark} />} */}
        <Launchpad dark={this.props.dark} show={this.state.showLaunchpad} />

        {/* Dock */}
        <Dock
          open={this.openApp}
          showApps={this.state.showApps}
          toggleLaunchpad={this.toggleLaunchpad}
          hidde={this.state.hiddeDock}
        />
      </div>
    );
  }
}
