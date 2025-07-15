import * as React from "react";
import { Navigate } from "react-router-dom";
import { getRolesFromToken } from "../utils/jwt";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RequireRole({ children, allowedRoles }: RequireRoleProps) {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const roleObjects = getRolesFromToken(token); // [{ authority: "ROLE_ADMIN", id: 1 }]
  const roles = roleObjects.map((role: any) => role.authority); // ["ROLE_ADMIN"]

  console.log("User roles:", roles);
  const isAuthorized = allowedRoles.some((r) => roles.includes(r));

  return isAuthorized ? <>{children}</> : <Navigate to="/unauthorized" />;
}
