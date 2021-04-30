import React from "react";

export default function Dock({ openWindow, showLaunchpad, setShowLaunchpad }) {
  const openApp = (title) => {
    setShowLaunchpad(false);
    openWindow(title);
  };

  return (
    <div
      className="dock w-full fixed bottom-0"
      style={{
        zIndex: 99999
      }}
    >
      <ul className="mx-auto w-max p-2 space-x-2 flex flex-row justify-center justify-between bg-white bg-opacity-20 blur rounded-t-lg shadow-2xl">
        <li
          key="dock-launchpad"
          onClick={() => setShowLaunchpad(!showLaunchpad)}
        >
          <img
            className="w-12"
            src="icons/launchpad.png"
            alt="Launchpad"
            title="Launchpad"
          />
        </li>
        <li key="dock-text" onClick={() => openApp("Notepad")}>
          <img
            className="w-12"
            src="icons/text.png"
            alt="Notepad"
            title="Notepad"
          />
        </li>
        <li key="dock-safari" onClick={() => openApp("Safari")}>
          <img
            className="w-12"
            src="icons/safari.png"
            alt="Safari"
            title="Safari"
          />
        </li>
        <li key="dock-mail">
          <a href="mailto:renovamenzxh@gmail.com">
            <img
              className="w-12"
              src="icons/mail.png"
              alt="Mail"
              title="Mail"
            />
          </a>
        </li>
        <li key="dock-github">
          <a
            href="https://github.com/Renovamen"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="w-12"
              src="icons/github.png"
              alt="Github"
              title="Github"
            />
          </a>
        </li>
        <li key="dock-cmd" onClick={() => openApp("Terminal")}>
          <img
            className="w-12"
            src="icons/terminal.png"
            alt="Terminal"
            title="Terminal"
          />
        </li>
        <li key="dock-facetime" onClick={() => openApp("FaceTime")}>
          <img
            className="w-12"
            src="icons/facetime.png"
            alt="FaceTime"
            title="FaceTime"
          />
        </li>
      </ul>
    </div>
  );
}
