import { AccountInfo } from "@azure/msal-browser";

export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IFormResponse {
  UserName: string;
}

export interface IItem {
  "odata.etag": string;
  ItemCode: string;
  ItemName: string;
}

export interface IItemsResponse {
  value: IItem[];
  "odata.nextLink": string;
}

export interface IBusinessPartner {
  "odata.etag": string;
  CardCode: string;
  CardName: string;
}

export interface IBusinessResponse {
  value: IBusinessPartner[];
  "odata.nextLink": string;
}

export interface IOData {
  metadata: string;
  nextLink?: string;
}

export interface ISalesPerson {
  SalesEmployeeCode: number;
  SalesEmployeeName: string;
  EmployeeID: null;
  Active: "tYES";
  Email: null;
}

export interface IUserContext {
  user: AccountInfo | null;
  setUser: React.Dispatch<React.SetStateAction<AccountInfo | null>>;
  getActiveUserSAP: (email: string) => Promise<void>;
  apiLogin: () => Promise<void>;
  getItems: () => Promise<void>;
  items: IItem[];
  salesPerson: ISalesPerson;
}
