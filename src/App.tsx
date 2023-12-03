import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import MyButton from "./MyButton";

const App = () => (
  <div className="container">
    <div>Name: remote</div>
    <MyButton />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));



