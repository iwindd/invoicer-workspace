import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// providers
import ThemeRegistry from "./styles/ThemeRegistry";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeRegistry>
        <QueryProvider>
          <App />
        </QueryProvider>
      </ThemeRegistry>
    </LocalizationProvider>
  </React.StrictMode>
);
