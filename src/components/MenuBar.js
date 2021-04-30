import React, { useEffect, useState } from "react";
import format from "date-fns/format";
// ------- import icons -------
import { BsBatteryFull } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";

const MenuItem = ({ children }) => {
  return (
    <div className="inline-flex flex-row space-x-1 hover:bg-white hover:bg-opacity-30 rounded p-1">
      {children}
    </div>
  );
};

export default function MenuBar({ title, toggleControlCenter }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setTimeout(() => setDate(new Date()), 60 * 1000);
    return () => clearTimeout(timer);
  }, [date]);

  return (
    <div className="nightwind-prevent nightwind-prevent-block w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-gray-500 bg-opacity-10 blur shadow transition">
      <div className="flex flex-row items-center space-x-4">
        <AiFillApple size={18} />
        <span className="font-semibold">{title}</span>
      </div>
      <div className="flex flex-row justify-end items-center space-x-2">
        <MenuItem>
          <span className="text-xs mt-0.5 mr-1">100%</span>
          <BsBatteryFull size={20} />
        </MenuItem>
        <MenuItem>
          <FaWifi size={17} />
        </MenuItem>
        <MenuItem>
          <BiSearch size={17} />
        </MenuItem>
        <MenuItem>
          <img
            className="w-4 h-4 filter-invert"
            src="icons/menu/controlcenter.png"
            alt="control center"
            onClick={() => toggleControlCenter()}
          />
        </MenuItem>
        <span>{format(date, "eee d MMM h:mm aa")}</span>
      </div>
    </div>
  );
}
