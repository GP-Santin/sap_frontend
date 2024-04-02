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
  isApprover: (userMail: string) => Promise<void>
  user: IUser | undefined;
}

export type IUser = {
  id: number;
  nome: string;
  email: string;
  aprovador: boolean;
  st: true;
};
