import { Navigate, Outlet } from "react-router-dom";

function SAPRoutes() {
  const sapLoggedIn = localStorage.getItem("@session");
  return sapLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default SAPRoutes;
