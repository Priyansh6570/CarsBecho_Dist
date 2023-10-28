import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Modal from "react-modal";

import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"

const config = {
  apiKey: "hbp_yItuYe5dU8yDflBpPmcDesUt1wyVbX05Z7ZK",
  environment: "production"
}

const honeybadger = Honeybadger.configure(config)

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

// Set the app element
Modal.setAppElement("#root");

ReactDOM.render(
  // <HoneybadgerErrorBoundary honeybadger={honeybadger}>
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  // </HoneybadgerErrorBoundary>,
  document.getElementById("root")
);
