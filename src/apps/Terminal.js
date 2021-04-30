import React, { useState } from "react";
import Window from "../components/Window";

export default function Terminal({ show, setShow, active, z }) {
  const [cmdMax, setCmdMax] = useState(false);
  return (
    <Window
      title="Terminal"
      show={show}
      setShow={setShow}
      max={cmdMax}
      setMax={setCmdMax}
      active={active}
      z={z}
      size={"h-3/5 w-1/2"}
    >
      <div className="w-full h-full bg-black bg-opacity-80 text-white" />
    </Window>
  );
}
