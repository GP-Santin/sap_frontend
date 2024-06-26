import { Route, Routes } from "react-router-dom";
import PrivatesRoutes from "./PrivatesRoutes";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/SAPLogin/SAPLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseRequests from "../pages/Dashboard/pages/PurchaseRequests/PurchaseRequests";
import Regularization from "../pages/Dashboard/pages/Regularization/Regularization";
import SAPRoutes from "./SapRoutes";
import ManagerRoutes from "./ManagerRoutes";
import ApprovalRequests from "../pages/Dashboard/pages/ApprovalRequests/ApprovalRequests";

function RoutesMain({ toggleTheme, theme }: INavProps) {
  const sessionSAP = localStorage.getItem("@session");
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route index path="/" element={<LoginPage />} />
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
              path="/dashboard/purchase-requests/open-items"
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
      <Route element={<ManagerRoutes />}>
        <Route
          path="/dashboard/approval-requests"
          element={<ApprovalRequests />}
        />
      </Route>
    </Routes>
  );
}

export default RoutesMain;
