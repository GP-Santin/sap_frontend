import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";

function RoutesMain() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<PrivatesRoutes />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default RoutesMain;
