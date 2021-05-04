import React from "react";
import { useMotionValue } from "framer-motion";
import apps from "../../configs/apps";
import DockItem from "./DockItem";

export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}) {
  const openApp = (id) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue(null);

  return (
    <div
      className="dock w-full fixed bottom-0 overflow-x-scroll sm:overflow-x-visible"
      style={{
        zIndex: hide ? 0 : 99999
      }}
    >
      <ul
        className="mx-auto w-max px-2 space-x-2 flex flex-row justify-center justify-between bg-white bg-opacity-20 blur rounded-none sm:rounded-t-lg shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {apps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.title}
            img={app.img}
            mouseX={mouseX}
            desktop={app.desktop}
            openApp={openApp}
            isOpen={app.desktop && showApps[app.id]}
            link={app.link}
          />
        ))}
      </ul>
    </div>
  );
}
