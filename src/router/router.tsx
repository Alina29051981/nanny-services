// src/router/router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";
import Loader from "../components/Loader/Loader";

const Home = lazy(() => import("../pages/Home/Home"));
const Nannies = lazy(() => import("../pages/Nannies/Nannies"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "nannies",
        element: (
          <Suspense fallback={<Loader />}>
            <Nannies />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Suspense fallback={<Loader />}>
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
]);