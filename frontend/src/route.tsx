// routes
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/home";
import SignInPage from "./routes/signin";

const router = createBrowserRouter(
  [
    { path: "/", element: HomePage },
    { path: "/signin", element: SignInPage },
  ].map((r) => ({ ...r, element: <r.element /> }))
);

export default router;
