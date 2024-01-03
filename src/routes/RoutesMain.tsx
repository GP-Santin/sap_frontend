import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/SAPLogin/SAPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseRequests from "../pages/Dashboard/pages/PurchaseRequests/PurchaseRequests";
function RoutesMain({ toggleTheme, theme }: any) {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivatesRoutes />}>
        <Route path="/login" element={<HomePage />} />
        <Route path="/dashboard/purchase-requests" element={<PurchaseRequests />} />
      </Route>
      <Route
        path="/dashboard"
        element={<Dashboard toggleTheme={toggleTheme} theme={theme} />}
      />
    </Routes>
  );
}

export default RoutesMain;
