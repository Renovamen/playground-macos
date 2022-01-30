import React, { useState } from "react";
import { useSelector } from "react-redux";
import { websites, wallpapers } from "../../configs";
import { FaShieldAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsLayoutSidebar } from "react-icons/bs";
import { IoShareOutline, IoCopyOutline } from "react-icons/io5";
import { checkURL } from "../../utils";
import type { SiteSectionData, SiteData, RootReduxState } from "../../types";

interface SafariState {
  goURL: string;
  currentURL: string;
}

interface SafariProps {
  width?: number;
}

interface NavProps {
  width: number;
  setGoURL: (url: string) => void;
}

interface NavSectionProps extends NavProps {
  section: SiteSectionData;
}

const NavSection = ({ width, section, setGoURL }: NavSectionProps) => {
  const grid = width < 640 ? "grid-cols-4" : "grid-cols-9";

  return (
    <div className="mx-auto pt-8 w-full max-w-screen-md px-4">
      <div className="text-xl sm:text-2xl font-medium ml-2 text-black">
        {section.title}
      </div>
      <div className={`mt-3 grid grid-flow-row ${grid}`}>
        {section.sites.map((site: SiteData) => (
          <div
            key={`safari-nav-${site.id}`}
            className="h-28 w-full flex justify-center items-center"
          >
            <div className="h-full w-full flex flex-col">
              <div className="nightwind-prevent h-max w-max mx-auto bg-white rounded-md">
                {site.img ? (
                  <img
                    className="w-16 h-16 mx-auto rounded-md"
                    src={site.img}
                    alt={site.title}
                    title={site.title}
                    onClick={
                      site.inner
                        ? () => setGoURL(site.link)
                        : () => window.open(site.link)
                    }
                  />
                ) : (
                  <div
                    className="w-16 h-16 mx-auto rounded-md flex justify-center items-center cursor-default"
                    onClick={
                      site.inner
                        ? () => setGoURL(site.link)
                        : () => window.open(site.link)
                    }
                  >
                    <span className="text-lg text-center">{site.title}</span>
                  </div>
                )}
              </div>
              <span className="mt-2 mx-auto text-black text-sm">
                {site.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const numTracker = Math.floor(Math.random() * 99 + 1);

const NavPage = ({ width, setGoURL }: NavProps) => {
  const dark = useSelector((state: RootReduxState) => state.dark);

  const grid = width < 640 ? "grid-cols-4" : "grid-cols-8";
  const span = width < 640 ? "col-span-3" : "col-span-7";

  return (
    <div
      className="w-full safari-content overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full min-h-full pt-8 bg-gray-100 bg-opacity-80 backdrop-blur-2xl">
        {/* Favorites */}
        <NavSection
          section={websites.favorites}
          setGoURL={setGoURL}
          width={width}
        />

        {/* Frequently Visited */}
        <NavSection section={websites.freq} setGoURL={setGoURL} width={width} />

        {/* Privacy Report */}
        <div className="mx-auto pt-8 pb-16 px-6 w-full max-w-screen-md px-4">
          <div className="text-xl sm:text-2xl text-black font-medium">
            Privacy Report
          </div>
          <div
            className={`h-16 w-full mt-4 grid ${grid} bg-gray-50 bg-opacity-70 shadow-md rounded-xl text-sm`}
          >
            <div className="text-black col-start-1 col-span-1 flex flex-row items-center justify-center space-x-2">
              <FaShieldAlt size={24} />
              <span className="text-xl">{numTracker}</span>
            </div>
            <div
              className={`col-start-2 ${span} flex items-center text-black px-2`}
            >
              In the last seven days, Safari has prevent {numTracker} tracker
              from profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useSelector((state: RootReduxState) => state.dark);

  return (
    <div
      className="w-full safari-content bg-blue-50 overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full bg-gray-100 bg-opacity-80 backdrop-blur-2xl flex items-center justify-center">
        <div
          className={`pb-10 text-center ${
            dark ? "text-gray-500" : "text-gray-600"
          }`}
        >
          <div className="text-2xl font-bold">
            You Are Not Connected to the Internet
          </div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently
            offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const Safari = ({ width }: SafariProps) => {
  const wifi = useSelector((state: RootReduxState) => state.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: ""
  });

  const setGoURL = (url: string) => {
    const isValid = checkURL(url);

    if (isValid) {
      if (
        url.substring(0, 7) !== "http://" &&
        url.substring(0, 8) !== "https://"
      )
        url = `https://${url}`;
    } else if (url !== "") {
      url = `https://www.bing.com/search?q=${url}`;
    }

    setState({
      goURL: url,
      currentURL: url
    });
  };

  const pressURL = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    if (keyCode === "Enter") setGoURL((e.target as HTMLInputElement).value);
  };

  const buttonColor = state.goURL === "" ? "text-gray-400" : "text-gray-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "";

  return (
    <div className="w-full h-full bg-white">
      {/* browser topbar */}
      <div className={`h-10 grid ${grid} flex items-center bg-white`}>
        <div className="flex flex-row px-2">
          <button
            className={`w-7 h-6 border border-gray-300 ${buttonColor} outline-none focus:outline-none rounded flex justify-center items-center`}
            onClick={() => setGoURL("")}
          >
            <FiChevronLeft size={20} />
          </button>
          <button className="w-7 h-6 border border-gray-300 text-gray-400 outline-none focus:outline-none rounded flex justify-center items-center">
            <FiChevronRight size={20} />
          </button>
          <button className="w-9 h-6 ml-3 border border-gray-300 text-gray-700 outline-none focus:outline-none rounded flex justify-center items-center">
            <BsLayoutSidebar size={14} />
          </button>
        </div>
        <div className="flex flex-row justify-center px-2">
          <button className="w-9 h-6 mr-2 -ml-10 border border-gray-300 text-gray-400 outline-none focus:outline-none rounded flex justify-center items-center">
            <FaShieldAlt size={14} />
          </button>
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState({ ...state, currentURL: e.target.value })}
            onKeyPress={pressURL}
            className="h-6 w-full p-2 rounded text-sm text-center font-normal text-gray-500 bg-gray-200 outline-none focus:outline-none border-2 border-transparent focus:border-blue-400"
            placeholder="Search or enter website name"
          />
        </div>
        <div className={`flex flex-row justify-end px-2 ${hideLast}`}>
          <button
            className={`w-9 h-6 border border-gray-300 ${buttonColor} outline-none focus:outline-none rounded flex justify-center items-center`}
          >
            <IoShareOutline size={16} />
          </button>
          <button className="w-9 h-6 ml-2 border border-gray-300 text-gray-700 outline-none focus:outline-none rounded flex justify-center items-center">
            <IoCopyOutline size={16} />
          </button>
        </div>
      </div>

      {/* browser content */}
      {wifi ? (
        state.goURL === "" ? (
          <NavPage setGoURL={setGoURL} width={width as number} />
        ) : (
          <iframe
            title={"Safari clone browser"}
            src={state.goURL}
            frameBorder="0"
            className="safari-content w-full"
          />
        )
      ) : (
        <NoInternetPage />
      )}
    </div>
  );
};

export default Safari;
