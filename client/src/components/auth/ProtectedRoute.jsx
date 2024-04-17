import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, redirect = "/login", user }) => {
  const navigate = useNavigate();

  if (!user) {
    useEffect(() => {
      navigate(redirect);
    },);
  }
  return <>{children?children:<Outlet/>}</>
};

export default ProtectedRoute;
