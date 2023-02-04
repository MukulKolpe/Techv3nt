import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAccount } from "wagmi";

const ProtectedRoutes = () => {
  const { isConnected } = useAccount();
  return <div>{!isConnected ? <Navigate to="/" /> : <Outlet />}</div>;
};

export default ProtectedRoutes;
