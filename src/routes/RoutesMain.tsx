import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/SAPLogin/SAPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
function RoutesMain() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route
          path="/"
          element={<LoginPage />}
        />
      </Route>
      <Route element={<PrivatesRoutes />}>
        <Route
          path="/login"
          element={<HomePage />}
        />
      </Route>
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
  );
}

export default RoutesMain;
