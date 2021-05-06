import React, { Component } from "react";
import format from "date-fns/format";
import { BiSearch } from "react-icons/bi";
import apps from "../configs/apps";
import launchpad from "../configs/launchpad";

const allApps = {
  app: apps,
  portfolio: launchpad
};

const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomDate() {
  const timeStamp = new Date().getTime();
  const randomStamp = getRandom(0, timeStamp);
  const date = format(randomStamp, "MM/dd/yyyy");
  return date;
}

export default class Spotlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      curDetails: null,
      appList: null
    };
    this.appIndices = 0;
    this.curSelection = 0;
  }

  search = (type) => {
    if (this.state.searchText === "") return [];
    const text = this.state.searchText.toLowerCase();
    const list = allApps[type].filter((item) => {
      return item.title.toLowerCase().substring(0, text.length) === text;
    });
    return list;
  };

  renderAppList = (type, startId) => {
    const result = this.search(type);
    let appList = [];
    let curID = startId;

    for (let app of result) {
      const bg = curID === 0 ? "bg-blue-500" : "bg-transparent";
      const text = curID === 0 ? "text-white" : "text-black";

      if (curID === 0) {
        const curDetails = app;
        curDetails.type = type;
        this.setState({ curDetails });
      }

      appList.push(
        <li
          id={`spotlight-${curID}`}
          key={`spotlight-${curID}`}
          className={`pl-4 h-7 w-full flex flex-row ${bg} ${text} cursor-default`}
          data-app-id={app.id}
          data-app-type={type}
        >
          <div className="flex-none w-8 flex items-center">
            <img
              className="w-5 mx-auto"
              src={app.img}
              alt={app.title}
              title={app.title}
            />
          </div>
          <div className="flex-grow flex items-center pl-3">{app.title}</div>
        </li>
      );

      curID += 1;
    }
    return appList;
  };

  updateAppList = () => {
    const app = this.renderAppList("app", 0);
    const portfolio = this.renderAppList("portfolio", app.length);

    this.appIndices = app.length + portfolio.length;

    const appList = (
      <div>
        {app.length !== 0 && (
          <div>
            <div className="pl-6 h-4 text-xs bg-gray-400 bg-opacity-80 flex items-center text-black">
              Applications
            </div>
            <ul className="w-full text-sm">{app}</ul>
          </div>
        )}
        {portfolio.length !== 0 && (
          <div>
            <div className="pl-6 h-4 text-xs bg-gray-400 bg-opacity-80 flex items-center text-black">
              Portfolio
            </div>
            <ul className="w-full text-sm">{portfolio}</ul>
          </div>
        )}
      </div>
    );
    this.setState({ appList });
  };

  getCurDetails = () => {
    const elem = document.querySelector(`#spotlight-${this.curSelection}`);
    const id = elem.dataset.appId;
    const type = elem.dataset.appType;
    let curDetails = allApps[type].find((item) => {
      return item.id === id;
    });
    curDetails.type = type;
    this.setState({ curDetails });
  };

  handleHighlight = (cur) => {
    // remove highlight
    let classes = cur.className;
    classes = classes.replace("text-white", "text-black");
    classes = classes.replace("bg-blue-500", "bg-transparent");
    cur.className = classes;

    // add highlight
    const next = document.querySelector(`#spotlight-${this.curSelection}`);
    classes = next.className;
    classes = classes.replace("text-black", "text-white");
    classes = classes.replace("bg-transparent", "bg-blue-500");
    next.className = classes;

    // get details of the current selected app
    this.getCurDetails();
  };

  keyPress = (e) => {
    const keyCode = e.key;
    const $curApp = document.querySelector(`#spotlight-${this.curSelection}`);

    // ----------- select next app -----------
    if (keyCode === "ArrowDown" && this.curSelection < this.appIndices - 1) {
      this.curSelection++;
      this.handleHighlight($curApp);
    }
    // ----------- select previous app -----------
    else if (keyCode === "ArrowUp" && this.curSelection > 0) {
      this.curSelection--;
      this.handleHighlight($curApp);
    }
    // ----------- launch app -----------
    else if (keyCode === "Enter") {
      if (!this.state.curDetails) return;
      if (this.state.curDetails.type === "app" && !this.state.curDetails.link) {
        this.props.openApp(this.state.curDetails.id);
        this.props.toggleSpotlight();
      } else {
        window.open(this.state.curDetails.link);
        this.props.toggleSpotlight();
      }
    }
  };

  handleInputChange = (e) => {
    // current selected id go back to 0
    this.curSelection = 0;
    // update search text and guess app list
    this.appIndices = 0;
    this.setState(
      {
        searchText: e.target.value
      },
      () => this.updateAppList()
    );
    // don't show app details when there is no input
    if (e.target.value === "") this.setState({ curDetails: null });
  };

  focusOnInput = () => {
    document.querySelector("#spotlight-input").focus();
  };

  render() {
    return (
      <div
        className="spotlight fixed mt-32 h-max rounded-md bg-gray-50 bg-opacity-80 blur border border-gray-400 border-opacity-50 shadow-2xl"
        style={{ zIndex: 99997 }}
        onKeyDown={this.keyPress}
        onClick={this.focusOnInput}
      >
        <div className="w-full grid grid-cols-8 sm:grid-cols-11 h-14 rounded-md bg-transparent">
          <div className="col-start-1 col-span-1 flex justify-center items-center">
            <BiSearch className="ml-1 text-gray-600" size={28} />
          </div>
          <input
            id="spotlight-input"
            className="col-start-2 col-span-7 sm:col-span-10 outline-none focus:outline-none bg-transparent px-1 text-black text-2xl"
            placeholder="Spotlight Search"
            value={this.state.searchText}
            onChange={(e) => this.handleInputChange(e)}
            autoFocus={true}
          />
        </div>
        {this.state.searchText !== "" && (
          <div
            className="bg-transparent flex flex-row border-t border-gray-400 border-opacity-50"
            style={{ height: "340px" }}
          >
            <div className="flex-none w-32 sm:w-72 border-r border-gray-400 border-opacity-50">
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
