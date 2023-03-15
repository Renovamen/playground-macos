import { useState } from "react";
import { wallpapers, launchpadApps } from "~/configs";
import { useStore } from "~/stores";

interface LaunchpadProps {
  show: boolean;
  toggleLaunchpad: (target: boolean) => void;
}

const placeholderText = "Search";

export default function Launchpad({ show, toggleLaunchpad }: LaunchpadProps) {
  const dark = useStore((state) => state.dark);

  const [searchText, setSearchText] = useState("");
  const [focus, setFocus] = useState(false);

  const search = () => {
    if (searchText === "") return launchpadApps;
    const text = searchText.toLowerCase();
    const list = launchpadApps.filter((item) => {
      return (
        item.title.toLowerCase().includes(text) || item.id.toLowerCase().includes(text)
      );
    });
    return list;
  };

  const close = show ? "" : "opacity-0 invisible transition-opacity duration-200";

  return (
    <div
      className={`${close} z-30 transform scale-110 w-full h-full fixed overflow-hidden bg-center bg-cover`}
      id="launchpad"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`
      }}
      onClick={() => toggleLaunchpad(false)}
    >
      <div className="w-full h-full absolute bg-gray-900/20 backdrop-blur-2xl">
        <div
          className="mx-auto flex h-7 w-64 mt-5 bg-gray-200/10"
          border="1 rounded-md gray-200/30"
          onClick={(e) => e.stopPropagation()}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <div
            className={`${
              focus ? "w-6 duration-200" : "w-26 delay-250"
            } hstack justify-end`}
          >
            <span className="i-bx:search ml-1 text-white" />
          </div>
          <input
            className="flex-1 min-w-0 no-outline bg-transparent px-1 text-sm text-white"
            placeholder={placeholderText}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div
          className="max-w-[1100px] mx-auto mt-8 w-full px-4 sm:px-10"
          display="grid"
          grid="flow-row cols-4 sm:cols-7"
        >
          {search().map((app) => (
            <div key={`launchpad-${app.id}`} className="h-32 sm:h-36 w-full flex-center">
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
