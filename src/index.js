import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/index.tailwind.css";

import Desktop from "./components/Desktop";
import Login from "./components/Login";

export default function App() {
  const [logon, setlogon] = useState(false);
  if (logon) {
    return <Desktop />;
  } else {
    return <Login setlogon={setlogon} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
