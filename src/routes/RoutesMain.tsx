import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/SAPLogin/SAPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseRequests from "../pages/Dashboard/pages/PurchaseRequests/PurchaseRequests";
import Regularization from "../pages/Dashboard/pages/Regularization/Regularization";
import SAPRoutes from "./SapRoutes";
function RoutesMain({ toggleTheme, theme }: INavProps) {
  const sessionSAP = localStorage.getItem("@session");
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<LoginPage />} />
      </Route>
      <Route element={<PrivatesRoutes />}>
        <Route path="/login" element={<HomePage />} />
        {sessionSAP ? (
          <Route element={<SAPRoutes />}>
            <Route
              path="/dashboard/purchase-requests"
              element={
                <PurchaseRequests toggleTheme={toggleTheme} theme={theme} />
              }
            />
            <Route
              path="/dashboard/regularization"
              element={
                <Regularization toggleTheme={toggleTheme} theme={theme} />
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard toggleTheme={toggleTheme} theme={theme} />}
            />
          </Route>
        ) : (
          <Route path="/login" element={<HomePage />} />
        )}
      </Route>
    </Routes>
  );
}

export default RoutesMain;
