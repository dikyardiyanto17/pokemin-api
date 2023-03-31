import { createBrowserRouter } from "react-router-dom";
import Detail from "../views/Detail";
import Home from "../views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
