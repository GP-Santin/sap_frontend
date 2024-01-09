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
