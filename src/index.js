import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/reducers/RootReducer";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
require("firebase/auth");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGyujUiIYEkgaGmkn2_pIomRCzdcXvbzg",
  authDomain: "ecommercecart-fd1de.firebaseapp.com",
  databaseURL: "https://ecommercecart-fd1de-default-rtdb.firebaseio.com",
  projectId: "ecommercecart-fd1de",
  storageBucket: "ecommercecart-fd1de.appspot.com",
  messagingSenderId: "359940116836",
  appId: "1:359940116836:web:37666a19bfbaef23722a71",
  measurementId: "G-H2FJKDC4YK",
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

export const defaultApp = firebase.initializeApp(firebaseConfig);
export const auth = defaultApp.auth();
export const storage = defaultApp.storage();
export const firestore = defaultApp.firestore();

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
