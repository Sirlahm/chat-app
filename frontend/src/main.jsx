import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme.js";
import App from "./App.jsx";
import "./index.css";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App /> 
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
