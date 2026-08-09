import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role?: string | string[];
};

export function getUserRoles(): string[] {
  const token = localStorage.getItem("token");

  if (!token) {
    return [];
  }

  const decoded = jwtDecode<JwtPayload>(token);

  if (!decoded.role) {
    return [];
  }

  return Array.isArray(decoded.role) ? decoded.role : [decoded.role];
}
