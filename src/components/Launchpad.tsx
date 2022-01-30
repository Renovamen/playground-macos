import { useState } from "react";
import { useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { wallpapers, launchpadApps } from "../configs";
import type { RootReduxState } from "../types";

interface LaunchpadProps {
  show: boolean;
  toggleLaunchpad: (target: boolean) => void;
}

const placeholderText = "Search";

export default function Launchpad({ show, toggleLaunchpad }: LaunchpadProps) {
  const dark = useSelector((state: RootReduxState) => state.dark);
  const [searchText, setSearchText] = useState("");

  const search = () => {
    if (searchText === "") return launchpadApps;
    const text = searchText.toLowerCase();
    const list = launchpadApps.filter((item) => {
      return (
        item.title.toLowerCase().includes(text) ||
        item.id.toLowerCase().includes(text)
      );
    });
    return list;
  };

  const close = show
    ? ""
    : "opacity-0 invisible transition-opacity duration-200";

  return (
    <div
      className={`nightwind-prevent-block ${close} z-30 transform scale-110 w-full h-full fixed overflow-hidden bg-center bg-cover`}
      id="launchpad"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
      onClick={() => toggleLaunchpad(false)}
    >
      <div className="w-full h-full absolute bg-gray-900 bg-opacity-20 backdrop-blur-2xl">
        <div
          className="block mx-auto grid grid-cols-11 h-7 w-64 mt-5 rounded-md bg-gray-200 bg-opacity-10 border border-gray-200 border-opacity-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="col-start-1 col-span-1 flex justify-center items-center">
            <BiSearch className="ml-1" color="white" />
          </div>
          <input
            className="col-start-2 col-span-10 outline-none focus:outline-none bg-transparent px-1 text-sm text-white"
            placeholder={placeholderText}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div
          className="mx-auto mt-8 w-full px-4 sm:px-10 grid grid-flow-row grid-cols-4 sm:grid-cols-7"
          style={{
            maxWidth: "1100px"
          }}
        >
          {search().map((app) => (
            <div
              key={`launchpad-${app.id}`}
              className="h-32 sm:h-36 w-full flex justify-center items-center"
            >
              <div className="h-full w-full flex flex-col">
                <a
                  className="h-max"
                  href={app.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    className="w-14 sm:w-20 mx-auto"
                    src={app.img}
                    alt={app.title}
                    title={app.title}
                  />
                </a>
                <span className="mt-2 mx-auto text-white text-xs sm:text-sm">
                  {app.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
