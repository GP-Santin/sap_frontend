import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/SAPLogin/SAPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";

function RoutesMain({
  theme,
  themeToggler,
}: {
  theme: string;
  themeToggler: () => void;
}) {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route
          path="/"
          element={<LoginPage theme={theme} themeToggler={themeToggler} />}
        />
      </Route>
      <Route element={<PrivatesRoutes />}>
        <Route
          path="/login"
          element={<HomePage theme={theme} themeToggler={themeToggler} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard theme={theme} themeToggler={themeToggler} />}
        />
      </Route>
    </Routes>
  );
}

export default RoutesMain;
