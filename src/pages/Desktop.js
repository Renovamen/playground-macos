import React, { Component } from "react";
import nightwind from "nightwind/helper";

import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import Launchpad from "../components/Launchpad";
import ControlCenterMenu from "../components/ControlCenterMenu";
import Window from "../components/Window";
import apps from "../configs/apps";

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showApps: {},
      appsZ: {},
      maxApps: {},
      maxZ: 2,
      showLaunchpad: false,
      showControlCenter: false,
      currentTitle: "Finder",
      hiddeDock: false
    };
  }

  componentDidMount() {
    this.getAppsData();
  }

  getAppsData = () => {
    let showApps = {};
    let appsZ = {};
    let maxApps = {};
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
    });
    this.setState({ showApps });
  };

  toggleControlCenter = () => {
    this.setState({ showControlCenter: !this.state.showControlCenter });
  };

  toggleLaunchpad = (target) => {
    if (target !== undefined) this.setState({ showLaunchpad: target });
    else this.setState({ showLaunchpad: !this.state.showLaunchpad });
  };

  closeApp = (id) => {
    let showApps = this.state.showApps;
    showApps[id] = false;
    this.setState({ showApps });
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

  openApp = (id) => {
    let showApps = this.state.showApps;
    showApps[id] = true;
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
  };

  renderAppWindows = () => {
    return apps.map((app) => {
      if (this.state.showApps[app.id]) {
        const props = {
          title: app.title,
          id: app.id,
          width: app.width,
          height: app.height,
          z: this.state.appsZ[app.id],
          max: this.state.maxApps[app.id],
          close: this.closeApp,
          setMax: this.setAppMax,
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
        style={{ backgroundImage: "url(img/wallpaper.jpg)" }}
      >
        {/* Dark Model Toggler */}
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />

        {/* Top Menu Bar */}
        <MenuBar
          title={this.state.currentTitle}
          toggleControlCenter={this.toggleControlCenter}
        />

        {/* Control Center */}
        {this.state.showControlCenter && <ControlCenterMenu />}

        {/* Desktop Apps */}
        {this.renderAppWindows()}

        {/* Launchpad */}
        {this.state.showLaunchpad && <Launchpad />}

        {/* Dock */}
        <Dock
          open={this.openApp}
          toggleLaunchpad={this.toggleLaunchpad}
          hidde={this.state.hiddeDock}
        />
      </div>
    );
  }
}
