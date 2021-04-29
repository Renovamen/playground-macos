import React, { useState } from "react";
import Window from "../components/Window";

function SafariContent() {
  const [goURL, setGoURL] = useState("https://renovamen.ink/");
  const [currentURL, setCurrentURL] = useState("https://renovamen.ink/");

  const setURL = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13) {
      setGoURL(e.target.value);
      console.log(e.target.value);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-8 flex justify-center items-center bg-white">
        <input
          type="text"
          value={currentURL}
          onChange={(e) => setCurrentURL(e.target.value)}
          onKeyPress={setURL}
          className="h-6 w-4/5 p-2 rounded text-center font-normal text-gray-500 bg-gray-100"
        />
      </div>
      <iframe
        title={"Safari clone browser"}
        src={goURL}
        frameBorder="0"
        className="h-full w-full"
      />
    </div>
  );
}

export default function Safari({ show, setShow, active, z }) {
  const [safariMax, setSafariMax] = useState(false);
  return (
    <Window
      content={<SafariContent />}
      title="Safari"
      show={show}
      setShow={setShow}
      max={safariMax}
      setMax={setSafariMax}
      active={active}
      z={z}
      size={"h-3/4 w-3/5"}
    />
  );
}
