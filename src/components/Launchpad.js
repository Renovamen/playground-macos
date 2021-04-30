import React, { Component } from "react";
import { BiSearch } from "react-icons/bi";

const placeholderText = "Search";

const appList = [
  {
    title: "Flint",
    img: "icons/launchpad/flint.png",
    link: "https://github.com/Renovamen/flint"
  },
  {
    title: "Metallic",
    img: "icons/launchpad/meta.png",
    link: "https://github.com/Renovamen/metallic"
  },
  {
    title: "Alkaid",
    img: "icons/launchpad/rl.png",
    link: "https://github.com/Renovamen/alkaid"
  },
  {
    title: "Oh, Vue Icons!",
    img: "icons/launchpad/icon.png",
    link: "https://oh-vue-icons.netlify.app/"
  },
  {
    title: "Gungnir",
    img: "icons/launchpad/gungnir.png",
    link: "https://vuepress-theme-gungnir.vercel.app/"
  },
  {
    title: "My Notebook",
    img: "icons/launchpad/notebook.png",
    link: "https://vuepress-theme-gungnir.vercel.app/"
  },
  {
    title: "Fishmail",
    img: "icons/launchpad/fishmail.png",
    link: "https://fishmail.vercel.app/"
  },
  {
    title: "Résumé?",
    img: "icons/launchpad/resume.png",
    link: "https://midgard.renovamen.ink/"
  }
];

export default class Launchpad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  search = () => {
    if (this.state.searchText === "") return appList;
    const list = appList.filter((item) => {
      return item.title
        .toLowerCase()
        .includes(this.state.searchText.toLowerCase());
    });
    return list;
  };

  render() {
    return (
      <div
        className="nightwind-prevent-block w-screen h-screen fixed overflow-hidden bg-center bg-cover"
        style={{
          zIndex: 99998,
          backgroundImage: "url(img/wallpaper.jpg)"
        }}
      >
        <div
          className="w-full h-full absolute bg-gray-900 bg-opacity-20 blur"
          style={{
            zIndex: -1
          }}
        />

        <div className="block mx-auto grid grid-cols-11 w-64 mt-5 rounded-md bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30">
          <div className="col-start-1 col-span-1 flex justify-center items-center">
            <BiSearch className="ml-1" color="white" />
          </div>
          <input
            className="col-start-2 col-span-10 outline-none focus:outline-none bg-transparent px-1 text-white"
            placeholder={placeholderText}
            value={this.state.searchText}
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
        </div>

        <div
          className="mx-auto mt-8 w-full px-10 grid grid-flow-col grid-cols-7"
          style={{
            maxWidth: "1100px"
          }}
        >
          {this.search().map((app) => (
            <div
              key={`launchpad-${app.title}`}
              className="flex justify-center items-center"
            >
              <div className="w-full flex flex-col">
                <a href={app.link} target="_blank" rel="noreferrer">
                  <img
                    className="w-20 mx-auto"
                    src={app.img}
                    alt={app.title}
                    title={app.title}
                  />
                </a>
                <span className="mx-auto text-white">{app.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
