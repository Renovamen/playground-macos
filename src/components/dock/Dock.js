import React from "react";
import { useMotionValue } from "framer-motion";
import apps from "../../configs/apps";
import DockItem from "./DockItem";

export default function Dock({ open, showApps, toggleLaunchpad, hidde }) {
  const openApp = (id) => {
    if (id === "launchpad") toggleLaunchpad();
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue(null);

  return (
    <div
      className="dock w-full fixed bottom-0"
      style={{
        zIndex: hidde ? 0 : 99999
      }}
      onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
      onMouseLeave={() => mouseX.set(null)}
    >
      <ul className="mx-auto w-max px-2 space-x-2 flex flex-row justify-center justify-between bg-white bg-opacity-20 blur rounded-t-lg shadow-2xl">
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
