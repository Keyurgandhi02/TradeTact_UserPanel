import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import { LoadingProvider } from "./store/LoadingContext";
import Loading from "./components/Loading";
import { Offline, Online } from "react-detect-offline";
import NoInternetConnection from "./components/NoInternetConnection";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Online>
      <BrowserRouter>
        <LoadingProvider>
          <AuthProvider>
            <Loading />
            <App />
          </AuthProvider>
        </LoadingProvider>
      </BrowserRouter>
    </Online>
    <Offline>
      <NoInternetConnection />
    </Offline>
  </React.StrictMode>
);
