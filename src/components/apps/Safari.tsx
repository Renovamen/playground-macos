import React, { useState } from "react";
import { websites, wallpapers } from "~/configs";
import { checkURL } from "~/utils";
import { useStore } from "~/stores";
import type { SiteSectionData, SiteData } from "~/types";

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
    <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4">
      <div className="font-medium ml-2" text="xl sm:2xl">
        {section.title}
      </div>
      <div className={`mt-3 grid grid-flow-row ${grid}`}>
        {section.sites.map((site: SiteData) => (
          <div key={`safari-nav-${site.id}`} className="h-28 w-full flex-center">
            <div className="h-full w-full flex flex-col">
              <div className="h-max w-max mx-auto bg-white rounded-md">
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
                    className="w-16 h-16 mx-auto rounded-md flex-center cursor-default text-black"
                    onClick={
                      site.inner
                        ? () => setGoURL(site.link)
                        : () => window.open(site.link)
                    }
                  >
                    <span text="lg center">{site.title}</span>
                  </div>
                )}
              </div>
              <span m="t-2 x-auto" text="sm">
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
  const dark = useStore((state) => state.dark);

  const grid = width < 640 ? "grid-cols-4" : "grid-cols-8";
  const span = width < 640 ? "col-span-3" : "col-span-7";

  return (
    <div
      className="w-full safari-content overflow-y-scroll bg-center bg-cover c-text-black"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full min-h-full pt-8 c-bg-100/80 backdrop-blur-2xl">
        {/* Favorites */}
        <NavSection section={websites.favorites} setGoURL={setGoURL} width={width} />

        {/* Frequently Visited */}
        <NavSection section={websites.freq} setGoURL={setGoURL} width={width} />

        {/* Privacy Report */}
        <div className="mx-auto w-full max-w-screen-md" p="t-8 x-4 b-16">
          <div font="medium" text="xl sm:2xl">
            Privacy Report
          </div>
          <div
            className={`h-16 w-full mt-4 grid ${grid} shadow-md rounded-xl text-sm`}
            bg="gray-50/70 dark:gray-600/50"
          >
            <div className="col-start-1 col-span-1 flex-center space-x-2">
              <span className="i-fa-solid:shield-alt text-2xl" />
              <span className="text-xl">{numTracker}</span>
            </div>
            <div className={`col-start-2 ${span} hstack px-2`}>
              In the last seven days, Safari has prevent {numTracker} tracker from
              profiling you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoInternetPage = () => {
  const dark = useStore((state) => state.dark);

  return (
    <div
      className="w-full safari-content bg-blue-50 overflow-y-scroll bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
    >
      <div className="w-full h-full pb-10 backdrop-blur-2xl flex-center c-text-600 c-bg-100/80">
        <div className="text-center">
          <div className="text-2xl font-bold">You Are Not Connected to the Internet</div>
          <div className="pt-4 text-sm">
            This page can't be displayed because your computer is currently offline.
          </div>
        </div>
      </div>
    </div>
  );
};

const Safari = ({ width }: SafariProps) => {
  const wifi = useStore((state) => state.wifi);
  const [state, setState] = useState<SafariState>({
    goURL: "",
    currentURL: ""
  });

  const setGoURL = (url: string) => {
    const isValid = checkURL(url);

    if (isValid) {
      if (url.substring(0, 7) !== "http://" && url.substring(0, 8) !== "https://")
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

  const buttonColor = state.goURL === "" ? "c-text-400" : "c-text-700";
  const grid = (width as number) < 640 ? "grid-cols-2" : "grid-cols-3";
  const hideLast = (width as number) < 640 ? "hidden" : "flex";

  return (
    <div className="w-full h-full">
      {/* browser topbar */}
      <div className={`h-10 grid ${grid} items-center c-bg-white`}>
        <div className="flex px-2">
          <button
            className={`safari-btn w-7 ${buttonColor}`}
            onClick={() => setGoURL("")}
          >
            <span className="i-jam:chevron-left text-xl" />
          </button>
          <button className="safari-btn w-7 c-text-400">
            <span className="i-jam:chevron-right text-xl" />
          </button>
          <button className="safari-btn w-9 ml-3 c-text-700">
            <span className="i-bi:layout-sidebar text-sm" />
          </button>
        </div>
        <div className="hstack space-x-2 px-2">
          <button className="safari-btn w-9 -ml-10 c-text-400">
            <span className="i-fa-solid:shield-alt text-sm" />
          </button>
          <input
            type="text"
            value={state.currentURL}
            onChange={(e) => setState({ ...state, currentURL: e.target.value })}
            onKeyPress={pressURL}
            className="h-6 w-full p-2 rounded font-normal no-outline text-sm text-center c-text-500 c-bg-200"
            border="2 transparent focus:blue-400 dark:focus:blue-500"
            placeholder="Search or enter website name"
          />
        </div>
        <div className={`${hideLast} justify-end space-x-2 px-2`}>
          <button className={`safari-btn w-9 ${buttonColor}`}>
            <span className="i-ion:share-outline" />
          </button>
          <button className="safari-btn w-9 c-text-700">
            <span className="i-ion:copy-outline" />
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
            className="safari-content w-full bg-white"
          />
        )
      ) : (
        <NoInternetPage />
      )}
    </div>
  );
};

export default Safari;
