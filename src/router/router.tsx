// src/router/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";

import Home from "../pages/Home/Home";
import Nannies from "../pages/Nannies/Nannies";
import Favorites from "../pages/Favorites/Favorites";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "nannies",
        element: <Nannies />,
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
    ],
  },
]);