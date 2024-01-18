import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";
import { IOrderRequest } from "../../pages/Dashboard/pages/Regularization/components/Form/@types";

export interface IUserProviderProps {
  children: React.ReactNode;
}
export interface IUserContext {
  createPurchaseRequest: (formData: IPurchaseRequest) => void;
  getActiveUserSAP: (email: string) => Promise<void>;
  createPurchaseQuotations: (formdData: IOrderRequest) => void;
  logoutSAP: () => Promise<void>;
  getWarehouseCode: () => void
}
