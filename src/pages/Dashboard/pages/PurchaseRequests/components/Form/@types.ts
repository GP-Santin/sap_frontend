export interface IItemRequest {
  ItemCode: string;
  ItemDescription: string;
  Quantity: number;
  CostingCode2: string;
  ProjectCode: string;
  U_SNT_Finalidade: string;
  WarehouseCode: string;
}

export interface IPurchaseRequest {
  RequriedDate: string;
  DocumentLines: IItemRequest[];
  U_SNT_Suprimento: string;
  U_SNT_SC_Manut: string;
  Comments: string;
  DocumentsOwner: number;
  BPL_IDAssignedToInvoice: number;
  RequesterEmail: string;
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
