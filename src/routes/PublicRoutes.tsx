import { useMsal } from "@azure/msal-react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const { accounts } = useMsal();
  const isLoggedIn = accounts.length > 0;
  return !isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PublicRoutes;
