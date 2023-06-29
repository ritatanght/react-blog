import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BlogContextProvider } from "./context/blogContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BlogContextProvider>
        <App />
      </BlogContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
