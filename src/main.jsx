import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, Router, BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary:{
      main:"#ccc"

    }
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
