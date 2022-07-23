import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import { setupStore } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
