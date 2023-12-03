import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ActionProvider } from "./components/context/Actionprovider";
import { StoreProvider } from "./components/context/Storeprovider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ActionProvider>
        <App />
      </ActionProvider>
    </StoreProvider>
  </React.StrictMode>
);
