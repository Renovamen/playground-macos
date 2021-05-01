import React from "react";
import apps from "../configs/apps";

export default function Dock({ open, showApps, toggleLaunchpad, hidde }) {
  const openApp = (id) => {
    toggleLaunchpad(false);
    open(id);
  };

  return (
    <div
      className="dock w-full fixed bottom-0"
      style={{
        zIndex: hidde ? 0 : 99999
      }}
    >
      <ul className="mx-auto w-max px-2 pt-2 pb-0.5 space-x-2 flex flex-row justify-center justify-between bg-white bg-opacity-20 blur rounded-t-lg shadow-2xl">
        <li key="dock-launchpad" onClick={() => toggleLaunchpad()}>
          <img
            className="w-12"
            src="icons/launchpad.png"
            alt="Launchpad"
            title="Launchpad"
          />
        </li>
        {apps.map((app) => (
          <li
            key={`dock-${app.id}`}
            id={`dock-${app.id}`}
            onClick={() => openApp(app.id)}
            className="flex flex-col items-center"
          >
            <img
              className="w-12"
              src={app.img}
              alt={app.title}
              title={app.title}
            />
            <div
              className={`h-1 w-1 mt-0.5 rounded-full bg-gray-800 ${
                showApps[app.id] ? "" : "invisible"
              }`}
            />
          </li>
        ))}
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
      </ul>
    </div>
  );
}
