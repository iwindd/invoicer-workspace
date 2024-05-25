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
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
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
    </CookiesProvider>
  </React.StrictMode>
);
