import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";

export interface IUserProviderProps {
  children: React.ReactNode;
}
export interface IUserContext {
  createPurchaseRequest: (formData: IPurchaseRequest) => void;
  getActiveUserSAP: (email: string) => Promise<void>;
}
