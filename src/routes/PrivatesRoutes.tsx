import { useMsal } from "@azure/msal-react";
import { Navigate, Outlet } from "react-router-dom";

function PrivatesRoutes() {
  const { accounts } = useMsal();
  const isLoggedIn = accounts.length > 0;
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivatesRoutes;
