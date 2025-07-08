import * as React from "react";
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../utils/jwt";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RequireRole({ children, allowedRoles }: RequireRoleProps) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const roles = getRolesFromToken(token);
  const isAuthorized = allowedRoles.some((r) => roles.includes(r));

  return isAuthorized ? <>{children}</> : <Navigate to="/unauthorized" />;
}
