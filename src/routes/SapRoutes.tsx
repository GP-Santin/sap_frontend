import { Navigate, Outlet } from "react-router-dom";

function SAPRoutes() {
  const sapLoggedIn = sessionStorage.getItem("@session");
  return sapLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default SAPRoutes;
