import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import App from "./App";
import { OfflineStorageWrapper } from "./packages/contexts/OfflineStorageWrapper";

const offlineStorageConfig = {
  type: "indexedDB",
  name: import.meta.env.VITE_INDEXED_DB_NAME,
  version: import.meta.env.VITE_INDEXED_DB_VERSION,
  stores: {
    formData: "uuid, fullName, email, city, state, zipcode",
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <OfflineStorageWrapper config={offlineStorageConfig}>
      <App />
    </OfflineStorageWrapper>
  </React.StrictMode>,
);
