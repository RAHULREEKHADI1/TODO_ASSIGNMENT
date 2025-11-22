import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("jwt"); // Check if token exists

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  return <>{children}</>;
};

export default PrivateRoute;
