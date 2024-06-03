import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./config";

// providers
import ThemeRegistry from "./styles/ThemeRegistry";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "./providers/QueryProvider";
import { InterfaceProvider } from "./providers/InterfaceProvider";
import { AuthProvider } from "./providers/AuthProvider";

const router = createBrowserRouter(routes as any)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeRegistry>
        <QueryProvider>
          <InterfaceProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </InterfaceProvider>
        </QueryProvider>
      </ThemeRegistry>
    </LocalizationProvider>
  </React.StrictMode>
);
