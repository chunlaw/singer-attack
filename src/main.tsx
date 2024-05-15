import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppContextProvider } from "./context/AppContext.tsx";
import { BoardContextProvider } from "./context/BoardContext.tsx";
import { StoryContextProvider } from "./context/StoryContext.tsx";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BoardContextProvider>
          <AppContextProvider>
            <StoryContextProvider>
              <CssBaseline />
              <App />
            </StoryContextProvider>
          </AppContextProvider>
        </BoardContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
