import React from "react";
import ReactDOM from "react-dom";

import "assets/styles/base.css";
import Flow from "components/Flow";

const App = () => <Flow />;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
