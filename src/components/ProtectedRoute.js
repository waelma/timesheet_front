import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Register from "../pages/register/Register";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token && localStorage.getItem("role") !== "3" ? (
    localStorage.getItem("verifier") === "null" ? (
      <Register step={2} />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
