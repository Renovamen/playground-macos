import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";

import Desktop from "./pages/Desktop";
import Login from "./pages/Login";

export default function App() {
  const [logon, setlogon] = useState(false);
  const [dark, setDark] = useState(false);
  if (logon) {
    return <Desktop dark={dark} setDark={setDark} setlogon={setlogon} />;
  } else {
    return <Login setlogon={setlogon} dark={dark} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
