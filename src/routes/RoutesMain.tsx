import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/SAPLogin/SAPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
function RoutesMain({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route
          path="/"
          element={<LoginPage theme={theme} toggleTheme={toggleTheme} />}
        />
      </Route>
      <Route element={<PrivatesRoutes />}>
        <Route
          path="/login"
          element={<HomePage theme={theme} toggleTheme={toggleTheme} />}
        />
      </Route>
      <Route
        path="/dashboard"
        element={<Dashboard theme={theme} toggleTheme={toggleTheme} />}
      />
    </Routes>
  );
}

export default RoutesMain;
