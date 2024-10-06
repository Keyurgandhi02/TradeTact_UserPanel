import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import Loading from "./components/Loading";
import { Offline, Online } from "react-detect-offline";
import NoInternetConnection from "./components/NoInternetConnection";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
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
    </ThemeProvider>
  </React.StrictMode>
);
