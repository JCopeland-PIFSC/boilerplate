import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import App from "./App";
import { Application } from "@nmfs-radfish/react-radfish";
import ErrorBoundary from "@nmfs-radfish/react-radfish";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary>
    <React.StrictMode>
      <Application>
        <App />
      </Application>
    </React.StrictMode>
    ,
  </ErrorBoundary>,
);
