import { IProject } from "@/src/components/Projects/@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";

export interface IAppProviderProps {
  children: React.ReactNode;
}

export interface ILoading {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  FederalTaxID: string;
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

export interface ISalesPersonResponse {
  value: ISalesPerson[];
  "odata.nextLink": string;
}

export interface IProjectResponse {
  value: IProject[];
  "odata.nextLink": string;
}

export interface IAppContext {
  loading: ILoading | boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean | ILoading>>;
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
  items: IItem[];
  salesPerson: ISalesPerson;
  appLogin: (formData: TLoginForm) => Promise<void>;
}

export interface IUsage {
  ID: number;
  Usage: string;
}

export interface IUsageResponse {
  value: IUsage[];
  "odata.nextLink": string;
}
