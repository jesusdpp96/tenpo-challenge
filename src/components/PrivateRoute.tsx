import type React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

export const PrivateRoute = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  if (!isAuthenticated && !checkAuth()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
