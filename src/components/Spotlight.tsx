import React, { Component, createRef } from "react";
import format from "date-fns/format";
import { BiSearch } from "react-icons/bi";
import apps from "../configs/apps";
import launchpad from "../configs/launchpad";
import { LaunchpadData, AppsData } from "../types";

const allApps: { [key: string]: (LaunchpadData | AppsData)[] } = {
  app: apps,
  portfolio: launchpad
};

const getRandom = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (): string => {
  const timeStamp = new Date().getTime();
  const randomStamp = getRandom(0, timeStamp);
  const date = format(randomStamp, "MM/dd/yyyy");
  return date;
};

interface SpotlightProps {
  toggleSpotlight: () => void;
  openApp: (id: string) => void;
  toggleLaunchpad: (target: boolean) => void;
  btnRef: any;
}

interface SpotlightState {
  searchText: string;
  appList: JSX.Element | null;
  appIdList: string[];
  curDetails: any;
}

export default class Spotlight extends Component<
  SpotlightProps,
  SpotlightState
> {
  private curSelectIndex = 0;
  private spotlightRef = createRef<any>();

  constructor(props: SpotlightProps) {
    super(props);
    this.state = {
      searchText: "",
      curDetails: null,
      appList: null,
      appIdList: []
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  search = (type: string) => {
    if (this.state.searchText === "") return [];
    const text = this.state.searchText.toLowerCase();
    const list = allApps[type].filter((item: LaunchpadData | AppsData) => {
      return (
        item.title.toLowerCase().includes(text) ||
        item.id.toLowerCase().includes(text)
      );
    });
    return list;
  };

  handleClick = (id: string): void => {
    const curSelectIndex = this.state.appIdList.findIndex((item) => {
      return item === id;
    });
    this.updateHighlight(this.curSelectIndex, curSelectIndex);
    this.curSelectIndex = curSelectIndex;
    this.updateCurDetails();
  };

  handleDoubleClick = (id: string): void => {
    this.handleClick(id);
    this.launchCurApp();
  };

  handleClickOutside(e: MouseEvent): void {
    if (
      this.spotlightRef &&
      !this.spotlightRef.current.contains(e.target) &&
      !this.props.btnRef.current.contains(e.target)
    )
      this.props.toggleSpotlight();
  }

  launchCurApp = (): void => {
    if (this.state.curDetails.type === "app" && !this.state.curDetails.link) {
      const id = this.state.curDetails.id;
      if (id === "launchpad") this.props.toggleLaunchpad(true);
      else this.props.openApp(id);
      this.props.toggleSpotlight();
    } else {
      window.open(this.state.curDetails.link);
      this.props.toggleSpotlight();
    }
  };

  getTypeAppList = (type: string, startIndex: number) => {
    const result = this.search(type);
    let appList = [];
    let appIdList = [];

    for (let app of result) {
      const curIndex = startIndex + appIdList.length;
      const bg = curIndex === 0 ? "bg-blue-500" : "bg-transparent";
      const text = curIndex === 0 ? "text-white" : "text-black";

      if (curIndex === 0) this.setCurDetails(app, type);

      appList.push(
        <li
          id={`spotlight-${app.id}`}
          key={`spotlight-${app.id}`}
          className={`pl-4 h-7 w-full pr-1 flex flex-row ${bg} ${text} cursor-default`}
          data-app-type={type}
          onClick={() => this.handleClick(app.id)}
          onDoubleClick={() => this.handleDoubleClick(app.id)}
        >
          <div className="flex-none w-8 flex items-center">
            <img
              className="w-5 mx-auto"
              src={app.img}
              alt={app.title}
              title={app.title}
            />
          </div>
          <div className="flex-grow flex items-center pl-3 overflow-hidden whitespace-nowrap">
            {app.title}
          </div>
        </li>
      );
      appIdList.push(app.id);
    }

    return {
      appList: appList,
      appIdList: appIdList
    };
  };

  updateAppList = (): void => {
    const app = this.getTypeAppList("app", 0);
    const portfolio = this.getTypeAppList("portfolio", app.appIdList.length);

    const appIdList = [...app.appIdList, ...portfolio.appIdList];
    // don't show app details when there is no associating app
    if (appIdList.length === 0) this.setState({ curDetails: null });

    const appList = (
      <div>
        {app.appList.length !== 0 && (
          <div>
            <div className="pl-6 py-0.5 text-xs leading-none bg-gray-400 bg-opacity-80 flex items-center text-black">
              Applications
            </div>
            <ul className="w-full text-xs">{app.appList}</ul>
          </div>
        )}
        {portfolio.appList.length !== 0 && (
          <div>
            <div className="pl-6 py-0.5 text-xs leading-none bg-gray-400 bg-opacity-80 flex items-center text-black">
              Portfolio
            </div>
            <ul className="w-full text-xs">{portfolio.appList}</ul>
          </div>
        )}
      </div>
    );
    this.setState({
      appList: appList,
      appIdList: appIdList
    });
  };

  setCurDetails = (app: any, type: string): void => {
    const curDetails = app;
    curDetails.type = type;
    this.setState({ curDetails });
  };

  updateCurDetails = (): void => {
    const appId = this.state.appIdList[this.curSelectIndex];
    const elem = document.querySelector(`#spotlight-${appId}`) as HTMLElement;
    const id = appId;
    const type = elem.dataset.appType as string;
    const app = allApps[type].find((item: LaunchpadData | AppsData) => {
      return item.id === id;
    });
    this.setCurDetails(app, type);
  };

  updateHighlight = (prevIndex: number, curIndex: number): void => {
    // remove highlight
    const prevAppId = this.state.appIdList[prevIndex];
    const prev = document.querySelector(
      `#spotlight-${prevAppId}`
    ) as HTMLElement;
    let classes = prev.className;
    classes = classes.replace("text-white", "text-black");
    classes = classes.replace("bg-blue-500", "bg-transparent");
    prev.className = classes;

    // add highlight
    const curAppId = this.state.appIdList[curIndex];
    const cur = document.querySelector(`#spotlight-${curAppId}`) as HTMLElement;
    classes = cur.className;
    classes = classes.replace("text-black", "text-white");
    classes = classes.replace("bg-transparent", "bg-blue-500");
    cur.className = classes;
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const keyCode = e.key;
    const numApps = this.state.appIdList.length;

    // ----------- select next app -----------
    if (keyCode === "ArrowDown" && this.curSelectIndex < numApps - 1) {
      this.curSelectIndex++;
      this.updateHighlight(this.curSelectIndex - 1, this.curSelectIndex);
      this.updateCurDetails();
    }
    // ----------- select previous app -----------
    else if (keyCode === "ArrowUp" && this.curSelectIndex > 0) {
      this.curSelectIndex--;
      this.updateHighlight(this.curSelectIndex + 1, this.curSelectIndex);
      this.updateCurDetails();
    }
    // ----------- launch app -----------
    else if (keyCode === "Enter") {
      if (!this.state.curDetails) return;
      this.launchCurApp();
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // current selected id go back to 0
    this.curSelectIndex = 0;
    // don"t show app details when there is no input
    if (e.target.value === "") this.setState({ curDetails: null });
    // update search text and associating app list
    this.setState(
      {
        searchText: e.target.value
      },
      () => this.updateAppList()
    );
  };

  focusOnInput = (): void => {
    const input = document.querySelector("#spotlight-input") as HTMLElement;
    input.focus();
  };

  render() {
    return (
      <div
        className="spotlight fixed z-20 top-1/4 -mt-16 h-max rounded-md bg-gray-50 bg-opacity-80 blur border border-gray-400 border-opacity-50 shadow-2xl"
        onKeyDown={this.handleKeyPress}
        onClick={this.focusOnInput}
        ref={this.spotlightRef}
      >
        <div className="w-full grid grid-cols-8 sm:grid-cols-11 h-12 sm:h-14 rounded-md bg-transparent">
          <div className="col-start-1 col-span-1 flex justify-center items-center">
            <BiSearch className="ml-1 text-gray-600" size={28} />
          </div>
          <input
            id="spotlight-input"
            className="col-start-2 col-span-7 sm:col-span-10 outline-none focus:outline-none bg-transparent px-1 text-black text-xl sm:text-2xl"
            placeholder="Spotlight Search"
            value={this.state.searchText}
            onChange={(e) => this.handleInputChange(e)}
            autoFocus={true}
          />
        </div>
        {this.state.searchText !== "" && (
          <div
            className="bg-transparent flex flex-row border-t border-gray-400 border-opacity-50"
            style={{ height: "341px" }}
          >
            <div className="flex-none w-32 sm:w-72 border-r border-gray-400 border-opacity-50 overflow-y-scroll">
              {this.state.appList}
            </div>
            <div className="flex-grow">
              {this.state.curDetails && (
                <div className="h-full w-full flex flex-col">
                  <div className="mx-auto w-4/5 flex-none flex flex-col items-center justify-center h-56 border-b border-gray-400 border-opacity-50">
                    <img
                      className="w-32 mx-auto"
                      src={this.state.curDetails.img}
                      alt={this.state.curDetails.title}
                      title={this.state.curDetails.title}
                    />
                    <div className="mt-4 text-xl text-black">
                      {this.state.curDetails.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {`Version: ${getRandom(0, 99)}.${getRandom(0, 999)}`}
                    </div>
                  </div>
                  <div className="flex-grow flex flex-row text-xs">
                    <div className="flex-none w-1/2 flex flex-col items-end justify-center text-gray-500">
                      <div>Kind</div>
                      <div>Size</div>
                      <div>Created</div>
                      <div>Modified</div>
                      <div>Last opened</div>
                    </div>
                    <div className="pl-2 flex-grow flex flex-col items-start justify-center text-black">
                      <div>
                        {this.state.curDetails.type === "app"
                          ? "Application"
                          : "Portfolio"}
                      </div>
                      <div>{`${getRandom(0, 999)} G`}</div>
                      <div>{getRandomDate()}</div>
                      <div>{getRandomDate()}</div>
                      <div>{getRandomDate()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
