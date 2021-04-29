import React from "react";

export default function Dock({openWindow}) {
  return (
    <div className="w-full pb-2 fixed bottom-0">
      <ul className="mx-auto w-max p-2 space-x-2 flex flex-row justify-center justify-between bg-white bg-opacity-25 blur rounded-2xl shadow-2xl">
        <li key="dock-safari" onClick={() => openWindow("Safari")}>
          <img className="w-12" src="icons/safari.png" alt="Safari" title="Safari" />
        </li>
        <li key="dock-cmd" onClick={() => openWindow("Terminal")}>
          <img className="w-12" src="icons/terminal.png" alt="Terminal" title="Terminal" />
        </li>
        <li key="dock-facetime" onClick={() => openWindow("FaceTime")}>
          <img className="w-12" src="icons/facetime.png" alt="FaceTime" title="FaceTime" />
        </li>
        <li key="dock-text" onClick={() => openWindow("Notepad")}>
          <img className="w-12" src="icons/text.png" alt="Notepad" title="Notepad" />
        </li>
      </ul>
    </div>
  );
}
