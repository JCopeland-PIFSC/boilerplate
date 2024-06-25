import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import App from "./App";
import { Application } from "@nmfs-radfish/radfish";
import ErrorBoundary from "@nmfs-radfish/react-radfish";

const root = ReactDOM.createRoot(document.getElementById("root"));

const app = new Application({
  serviceWorker: {
    url: "/service-worker.js",
  }
});

app.on("ready", () => {
  root.render(
    <ErrorBoundary>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ErrorBoundary>
  );
});
