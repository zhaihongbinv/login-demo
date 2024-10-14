import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/features/login";
import Registry from "@/features/registry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registry",
    element: <Registry />,
  },
]);
