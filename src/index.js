import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import history from "./utils/history";
import { HashRouter } from "react-router-dom";
import { createStore } from "./store/createStore";

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter history={history}>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
