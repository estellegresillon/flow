import React from "react";
import ReactDOM from "react-dom";

import "assets/styles/base.css";
import VisitOnDesktop from "components/common/VisitOnDesktop";
import Flow from "components/Flow";
import { useWindowSize } from "hooks/useWindowSize";

const App = () => {
  const { width } = useWindowSize();
  const isMobile = width < 520;

  return isMobile ? <VisitOnDesktop /> : <Flow />;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
