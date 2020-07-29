import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import SelectedDateReducer from "./reducers/SelectedDate";
import NotesReducer from "./reducers/Notes";

// Combine both SelectedDateReducer and NotesReducer, for use in the redux store
const AppReducers = combineReducers({ SelectedDateReducer, NotesReducer });

// Create a data storage, and include it in the <Provider>'s store prop below.
const AppStore = createStore(
  AppReducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
