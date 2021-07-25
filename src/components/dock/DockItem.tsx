import { useRef, useState, useCallback, useEffect } from "react";
import useRaf from "@rooks/use-raf";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

// Hover effect is adopted from https://github.com/PuruVJ/macos-web/blob/main/src/components/dock/DockItem.tsx

const useDockHoverAnimation = (
  mouseX: MotionValue,
  ref: any,
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
  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1700,
      damping: 90
    }
  );

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

const useWindowWidth = () => {
  const [width, setWidth] = useState(document.body.offsetWidth);

  const onResize = useCallback(() => {
    setWidth(document.body.offsetWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return width;
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
  const windowWidth = useWindowWidth();

  return (
    <li
      id={`dock-${id}`}
      onClick={desktop || id === "launchpad" ? () => openApp(id) : () => {}}
      className="flex flex-col items-center justify-end mb-1 transition duration-150 ease-in origin-bottom"
    >
      <p className="tooltip text-black text-sm absolute px-3 py-1 bg-gray-300 bg-opacity-80 blur-sm rounded-md">
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
            style={windowWidth < 640 ? {} : { width, willChange: "width" }}
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
          style={windowWidth < 640 ? {} : { width, willChange: "width" }}
        />
      )}
      <div
        className={`h-1 w-1 m-0 rounded-full bg-gray-800 ${
          isOpen ? "" : "invisible"
        }`}
      />
    </li>
  );
}
