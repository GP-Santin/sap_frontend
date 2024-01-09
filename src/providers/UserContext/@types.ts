import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";

export interface IUserProviderProps {
  children: React.ReactNode;
}
export interface IUserContext {
  createPurchaseRequest: (formData: IPurchaseRequest) => void;
}
