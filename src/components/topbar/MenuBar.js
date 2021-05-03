import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import AppleMenu from "./AppleMenu";
import ControlCenterMenu from "./ControlCenterMenu";

// ------- import icons -------
import { BsBatteryFull } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";

const MenuItem = ({
  children,
  onClick,
  hiddeOnMobile = false,
  forceHover = false
}) => {
  const hidde = hiddeOnMobile ? "hidden sm:inline-flex" : "inline-flex";
  const hover = forceHover
    ? "bg-white bg-opacity-30"
    : "hover:bg-white hover:bg-opacity-30 rounded";
  return (
    <div
      className={`${hidde} cursor-default flex-row space-x-1 ${hover} p-1`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default function MenuBar({ title, dark, setDark, setlogon }) {
  const [date, setDate] = useState(new Date());
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setDate(new Date()), 60 * 1000);
    return () => clearTimeout(timer);
  }, [date]);

  return (
    <div className="nightwind-prevent w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition">
      <div className="flex flex-row items-center space-x-4">
        <MenuItem
          forceHover={showAppleMenu}
          onClick={() => setShowAppleMenu(!showAppleMenu)}
        >
          <AiFillApple size={18} />
        </MenuItem>
        <span className="cursor-default font-semibold">{title}</span>
      </div>

      {/* Open this when clicking on Apple logo */}
      {showAppleMenu && <AppleMenu setlogon={setlogon} />}

      <div className="flex flex-row justify-end items-center space-x-2">
        <MenuItem hiddeOnMobile={true}>
          <span className="text-xs mt-0.5 mr-1">100%</span>
          <BsBatteryFull size={20} />
        </MenuItem>
        <MenuItem hiddeOnMobile={true}>
          <FaWifi size={17} />
        </MenuItem>
        <MenuItem hiddeOnMobile={true}>
          <BiSearch size={17} />
        </MenuItem>
        <MenuItem onClick={() => setShowControlCenter(!showControlCenter)}>
          <img
            className="w-4 h-4 filter-invert"
            src="img/icons/menu/controlcenter.png"
            alt="control center"
          />
        </MenuItem>

        {/* Open this when clicking on Control Center button */}
        {showControlCenter && (
          <ControlCenterMenu dark={dark} setDark={setDark} />
        )}

        <span>{format(date, "eee d MMM h:mm aa")}</span>
      </div>
    </div>
  );
}
