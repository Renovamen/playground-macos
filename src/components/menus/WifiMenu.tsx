import { useRef } from "react";
import type { RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-rangeslider/lib/index.css";
import { toggleWIFI } from "../../redux/action";
import { useClickOutside } from "../../hooks";
import type { RootReduxState } from "../../types";

interface WifiMenuProps {
  toggleWifiMenu: () => void;
  btnRef: RefObject<HTMLDivElement>;
}

export default function WifiMenu({ toggleWifiMenu, btnRef }: WifiMenuProps) {
  const wifi = useSelector((state: RootReduxState) => state.wifi);
  const dispatch = useDispatch();
  const wifiRef = useRef<HTMLDivElement>(null);

  useClickOutside(wifiRef, toggleWifiMenu, [btnRef]);

  return (
    <div
      className="fixed h-11 w-80 max-w-full top-8 right-0 sm:right-2 px-2 py-0.5 flex gap-2 bg-gray-200 bg-opacity-90 border border-gray-400 border-opacity-50 rounded-lg text-black shadow-2xl"
      style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.3)" }}
      ref={wifiRef}
    >
      <div className="w-4/5 p-2.5 font-medium">Wi-Fi</div>
      <div className="w-1/5 py-2 text-center">
        <label className="switch-toggle">
          <input
            type="checkbox"
            checked={wifi}
            onChange={() => dispatch(toggleWIFI(!wifi))}
          />
          <span className="slider-toggle"></span>
        </label>
      </div>
    </div>
  );
}
