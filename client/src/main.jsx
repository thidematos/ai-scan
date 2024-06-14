import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "cropperjs/dist/cropper.css";
import { AIProvider } from "./context/AIProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AIProvider>
        <App />
      </AIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
