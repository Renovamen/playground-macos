import { useSelector } from "react-redux";
import { useMotionValue } from "framer-motion";
import { apps } from "../../configs";
import DockItem from "./DockItem";
import type { RootReduxState } from "../../types";

interface DockProps {
  open: (id: string) => void;
  showApps: {
    [key: string]: boolean;
  };
  showLaunchpad: boolean;
  toggleLaunchpad: (target: boolean) => void;
  hide: boolean;
}

export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}: DockProps) {
  const { dockSize, dockMag } = useSelector((state: RootReduxState) => ({
    dockSize: state.dockSize,
    dockMag: state.dockMag
  }));

  const openApp = (id: string) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue<number | null>(null);

  return (
    <div
      className={`dock w-full sm:w-max fixed left-0 right-0 mx-auto bottom-0 ${
        hide ? "z-0" : "z-50"
      } overflow-x-scroll sm:overflow-x-visible`}
    >
      <ul
        className="mx-auto w-max px-2 space-x-2 flex flex-row justify-center justify-between bg-white bg-opacity-20 border-t border-l border-r border-gray-400 border-opacity-30 backdrop-blur-2xl rounded-none sm:rounded-t-lg"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          height: `${(dockSize as number) + 15}px`
        }}
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
            dockSize={dockSize as number}
            dockMag={dockMag as number}
          />
        ))}
      </ul>
    </div>
  );
}
