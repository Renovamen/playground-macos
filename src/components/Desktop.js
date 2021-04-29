import React, { useState } from "react";

import MenuBar from "./MenuBar";
import Dock from "./Dock";
import ControlCenterMenu from "./ControlCenterMenu";
import FaceTime from "../apps/FaceTime";
import Terminal from "../apps/Terminal";
import Safari from "../apps/Safari";
import Notepad from "../apps/Notepad";

export default function Desktop() {
  const [showControlCenter, setShowControlCenter] = useState(false);

  const [bioShow, setBioShow] = useState(true);
  const [faceTimeShow, setFaceTimeShow] = useState(false);
  const [safariShow, setSafariShow] = useState(false);
  const [cmdShow, setCmdShow] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Playground");

  const [bioZ, setBioZ] = useState(2);
  const [faceTimeZ, setFaceTimeZ] = useState(2);
  const [safariZ, setSafariZ] = useState(2);
  const [cmdZ, setCmdZ] = useState(2);
  const [maxZ, setMaxZ] = useState(2);

  const setFunc = {
    Safari: {
      setZ: setSafariZ,
      setShow: setSafariShow
    },
    Notepad: {
      setZ: setBioZ,
      setShow: setBioShow
    },
    FaceTime: {
      setZ: setFaceTimeZ,
      setShow: setFaceTimeShow
    },
    Terminal: {
      setZ: setCmdZ,
      setShow: setCmdShow
    }
  };

  const openWindow = (title) => {
    setCurrentTitle(title);
    const setShow = setFunc[title].setShow;
    const setZ = setFunc[title].setZ;
    setShow(true);
    setZ(maxZ + 1);
    setMaxZ(maxZ + 1);
  };

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: "url(img/wallpaper.jpg)" }}
    >
      <MenuBar
        title={currentTitle}
        showControlCenter={showControlCenter}
        setShowControlCenter={setShowControlCenter}
      />
      {showControlCenter && <ControlCenterMenu />}

      <FaceTime
        show={faceTimeShow}
        setShow={setFaceTimeShow}
        active={openWindow}
        z={faceTimeZ}
      />
      <Terminal
        show={cmdShow}
        setShow={setCmdShow}
        active={openWindow}
        z={cmdZ}
      />
      <Notepad
        show={bioShow}
        setShow={setBioShow}
        active={openWindow}
        z={bioZ}
      />
      <Safari
        show={safariShow}
        setShow={setSafariShow}
        active={openWindow}
        z={safariZ}
      />

      <Dock openWindow={openWindow} />
    </div>
  );
}
