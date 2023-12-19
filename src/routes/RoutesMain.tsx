import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";

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
          path="/home"
          element={<HomePage theme={theme} themeToggler={themeToggler} />}
        />
      </Route>
    </Routes>
  );
}

export default RoutesMain;
