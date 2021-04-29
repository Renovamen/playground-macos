import React, { useEffect, useState } from "react";
import format from "date-fns/format";

function MenuItem({ children }) {
  return (
    <div className="inline-flex flex-row space-x-1 hover:bg-white hover:bg-opacity-50 rounded p-1">
      {children}
    </div>
  );
}

export default function MenuBar({
  title,
  showControlCenter,
  setShowControlCenter
}) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setTimeout(() => setDate(new Date()), 60 * 1000);
    return () => clearTimeout(timer);
  }, [date]);

  return (
    <div className="w-full h-6 px-4 fixed top-0 flex flex-row justify-between items-center text-sm text-white bg-indigo-700 bg-opacity-10 blur shadow transition">
      <div className="flex flex-row items-center space-x-4">
        <img
          className="h-4 filter-invert"
          src="menuicons/Apple.png"
          alt="apple_icon"
        />
        <span className="font-semibold">{title}</span>
      </div>
      <div className="flex flex-row justify-end items-center space-x-2">
        <MenuItem>
          <span className="text-xs">100%</span>
          <img
            className="h-4 filter-invert"
            src="menuicons/battery.100.png"
            alt="battery"
          />
        </MenuItem>
        <MenuItem>
          <img
            className="h-4 filter-invert"
            src="menuicons/magnifyingglass.png"
            alt="search"
          />
        </MenuItem>
        <MenuItem>
          <img
            className="w-4 h-4 filter-invert"
            src="menuicons/controlcenter.png"
            alt="control center"
            onClick={() => setShowControlCenter(!showControlCenter)}
          />
        </MenuItem>
        <span>{format(date, "eee d MMM h:mm aa")}</span>
      </div>
    </div>
  );
}
