export interface IItemRequest {
  ItemCode: string;
  ItemDescription: string;
  Quantity: number;
  CostingCode2: string;
  ProjectCode: string;
  U_SNT_Finalidade: string;
}

export interface IItemOrder {
  ItemCode: string;
  ItemDescription: string;
  Quantity: number;
  ProjectCode: string;
  CostingCode2: string;
  U_SNT_Finalidade: string;
  UnitPrice: number;
  LineTotal: number;
}

export interface IPurchaseRequest {
  RequriedDate: string;
  DocumentLines: IItemRequest[];
  U_SNT_Suprimento: string;
  U_SNT_SC_Manut: string;
  Comments: string;
  DocumentsOwner: number;
}

export interface IProjectManagement {
  FactorCode: string;
  FactorDescription: string;
  InWhichDimension: number;
}

export interface DocumentLineField {
  LineNum: number;
  ItemCode: string;
  ItemDescription: string;
  Quantity: string | number;
  CostingCode2: string;
  CostingCode: string;
  ProjectCode: string;
  U_SNT_Finalidade: string;
}
