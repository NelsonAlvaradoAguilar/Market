import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ user, children }) {
  if (!user) {
    // Not logged in – send to login or home
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin – send to home or 403 page
    return <Navigate to="/landing" replace />;
  }

  return children;
}
