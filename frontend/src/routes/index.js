import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      }
    ],
  }
]);

export default router;
