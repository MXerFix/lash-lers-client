import React from "react";
import ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store/store";
import './style.css';


const root_container = document.getElementById("root");
const root = ReactDOMClient.createRoot(root_container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
