import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store";
// context
import AdminState from "./context/AdminState";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <React.Fragment>
        <AdminState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
          </AdminState>
      </React.Fragment>
    </Provider>
);

serviceWorker.unregister()
