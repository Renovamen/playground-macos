import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";
import Boot from "./pages/Boot";

export default function App() {
  const [login, setLogin] = useState(false);
  const [booting, setBooting] = useState(false);
  const [restart, setRestart] = useState(false);
  const [sleep, setSleep] = useState(false);

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
      />
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);
