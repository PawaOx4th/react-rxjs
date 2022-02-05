import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PokermonStore } from "./Context";

ReactDOM.render(
  <React.StrictMode>
    <PokermonStore>
      <App />
    </PokermonStore>
  </React.StrictMode>,
  document.getElementById("root")
);
