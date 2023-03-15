import { useRef } from "react";
import type { RefObject } from "react";
import useRaf from "@rooks/use-raf";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useWindowSize } from "~/hooks";

// Hover effect is adopted from https://github.com/PuruVJ/macos-web/blob/main/src/components/dock/DockItem.tsx

const useDockHoverAnimation = (
  mouseX: MotionValue,
  ref: RefObject<HTMLImageElement>,
  dockSize: number,
  dockMag: number
) => {
  const distanceLimit = dockSize * 6;
  const distanceInput = [
    -distanceLimit,
    -distanceLimit / (dockMag * 0.65),
    -distanceLimit / (dockMag * 0.85),
    0,
    distanceLimit / (dockMag * 0.85),
    distanceLimit / (dockMag * 0.65),
    distanceLimit
  ];
  const widthOutput = [
    dockSize,
    dockSize * (dockMag * 0.55),
    dockSize * (dockMag * 0.75),
    dockSize * dockMag,
    dockSize * (dockMag * 0.75),
    dockSize * (dockMag * 0.55),
    dockSize
  ];
  const beyondTheDistanceLimit = distanceLimit + 1;

  const distance = useMotionValue(beyondTheDistanceLimit);
  const widthPX = useSpring(useTransform(distance, distanceInput, widthOutput), {
    stiffness: 1700,
    damping: 90
  });

  const width = useTransform(widthPX, (width) => `${width / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width, widthPX };
};

interface DockItemProps {
  id: string;
  title: string;
  img: string;
  mouseX: MotionValue;
  desktop: boolean;
  openApp: (id: string) => void;
  isOpen: boolean;
  link?: string;
  dockSize: number;
  dockMag: number;
}

export default function DockItem({
  id,
  title,
  img,
  mouseX,
  desktop,
  openApp,
  isOpen,
  link,
  dockSize,
  dockMag
}: DockItemProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { width } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag);
  const { winWidth } = useWindowSize();

  return (
    <li
      id={`dock-${id}`}
      onClick={desktop || id === "launchpad" ? () => openApp(id) : () => {}}
      className="hstack flex-col justify-end mb-1 transition duration-150 ease-in origin-bottom"
    >
      <p className="tooltip absolute px-3 py-1 rounded-md text-sm c-text-black c-bg-300/80">
        {title}
      </p>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <motion.img
            className="w-12"
            ref={imgRef}
            src={img}
            alt={title}
            title={title}
            draggable={false}
            style={winWidth < 640 ? {} : { width, willChange: "width" }}
          />
        </a>
      ) : (
        <motion.img
          className="w-12"
          ref={imgRef}
          src={img}
          alt={title}
          title={title}
          draggable={false}
          style={winWidth < 640 ? {} : { width, willChange: "width" }}
        />
      )}
      <div className={`h-1 w-1 m-0 rounded-full c-bg-800 ${isOpen ? "" : "invisible"}`} />
    </li>
  );
}
