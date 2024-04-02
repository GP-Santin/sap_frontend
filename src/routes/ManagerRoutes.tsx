import { Navigate, Outlet } from "react-router-dom";
import { useManagerContext } from "../providers/ManagerContext/ManagerProvider";
function ManagerRoutes() {
  const { manager } = useManagerContext();

  return manager ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default ManagerRoutes;
