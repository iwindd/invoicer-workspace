import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// providers
import ThemeRegistry from "./styles/ThemeRegistry";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "./providers/QueryProvider";

// routes
import route from "./route";

// routers
const router = createBrowserRouter(
  route.map((r) => ({ ...r, element: <r.element /> }))
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeRegistry>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </ThemeRegistry>
    </LocalizationProvider>
  </React.StrictMode>
);
