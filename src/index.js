import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import 'regenerator-runtime/runtime';



ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>
, document.getElementById("root"));
