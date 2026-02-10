// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Nannies from "../pages/Nannies/Nannies.jsx";
import Favorites from "../pages/Favorites.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/nannies",
    element: <Nannies />,
  },
  {
    path: "/favorites",
    element: (
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    ),
  },
 ]);
