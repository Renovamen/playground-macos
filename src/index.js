import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";
import Boot from "./pages/Boot";

export default function App() {
  const [login, setLogin] = useState(false);
  const [booting, setBooting] = useState(false);
  const [restart, setRestart] = useState(false);
  const [sleep, setSleep] = useState(false);
  const [dark, setDark] = useState(false);

  const shutMac = (e) => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const restartMac = (e) => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const sleepMac = (e) => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setLogin(false);
    setBooting(true);
  };

  if (booting) {
    return <Boot restart={restart} sleep={sleep} setBooting={setBooting} />;
  } else if (login) {
    return (
      <Desktop
        dark={dark}
        setDark={setDark}
        setLogin={setLogin}
        shutMac={shutMac}
        sleepMac={sleepMac}
        restartMac={restartMac}
      />
    );
  } else {
    return (
      <Login
        setLogin={setLogin}
        shutMac={shutMac}
        sleepMac={sleepMac}
        restartMac={restartMac}
        dark={dark}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
