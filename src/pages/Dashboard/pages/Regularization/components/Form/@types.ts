export interface IItemOrder {
  ItemCode: string;
  ItemDescription: string;
  Quantity: number;
  ProjectCode: string;
  CostingCode2: string;
  U_SNT_Finalidade: string;
  UnitPrice: number;
  LineTotal: number;
  WarehouseCode: string;
}

export interface IOrderRequest {
  RequriedDate: string;
  TaxDate: string;
  DocDueDate: string;
  U_SNT_Suprimento: string;
  U_SNT_SC_Manut: string;
  Comments: string;
  DocumentLines: IItemOrder[];
  DocumentsOwner: number;
  CardCode: string;
  DocTotal: number;
  Project: string;
  SalesPersonCode: number;
  U_SNT_Consumo: string;
  TransportationCode: number;
  U_SNT_MetodoPagto: string;
}
