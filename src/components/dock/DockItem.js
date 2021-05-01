import { useRef } from "react";
import useRaf from "@rooks/use-raf";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Hover effect is adopted from https://github.com/PuruVJ/macos-web/blob/main/src/components/dock/DockItem.tsx

const baseWidth = 50;
const distanceLimit = baseWidth * 6;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.1,
  baseWidth * 1.5,
  baseWidth * 2,
  baseWidth * 1.5,
  baseWidth * 1.1,
  baseWidth
];
const beyondTheDistanceLimit = distanceLimit + 1;

const useDockHoverAnimation = (mouseX, ref) => {
  const distance = useMotionValue(beyondTheDistanceLimit);
  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    {
      stiffness: 1300,
      damping: 82
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

  console.log(widthPX);
  return { width, widthPX };
};

export default function DockItem({
  id,
  title,
  img,
  mouseX,
  desktop,
  openApp,
  isOpen,
  link
}) {
  const imgRef = useRef();
  const { width } = useDockHoverAnimation(mouseX, imgRef);

  return (
    <li
      id={`dock-${id}`}
      onClick={desktop || id === "launchpad" ? () => openApp(id) : () => {}}
      className="flex flex-col items-center justify-end mb-1 transition duration-150 ease-in origin-bottom"
    >
      <p className="tooltip text-black text-sm absolute -top-full px-3 py-1 bg-gray-300 bg-opacity-80 blur-sm rounded-md">
        {title}
      </p>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <motion.img
            ref={imgRef}
            src={img}
            alt={title}
            title={title}
            draggable={false}
            style={{ width, willChange: "width" }}
          />
        </a>
      ) : (
        <motion.img
          ref={imgRef}
          src={img}
          alt={title}
          title={title}
          draggable={false}
          style={{ width, willChange: "width" }}
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
