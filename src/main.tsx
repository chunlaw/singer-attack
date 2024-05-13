import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppContextProvider } from "./context/AppContext.tsx";
import Background from "./components/layouts/Background.tsx";
import { BoardContextProvider } from "./context/BoardContext.tsx";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BoardContextProvider>
        <AppContextProvider>
          <CssBaseline />
          <Background />
          <App />
        </AppContextProvider>
      </BoardContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
