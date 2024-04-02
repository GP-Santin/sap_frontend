export interface IManagement {
  CenterCode: string;
  CenterName: string;
  U_SNT_IdGerencial: string;
}

export interface IManagementProps {
  setManagement: React.Dispatch<React.SetStateAction<string>>;
  setManagementCode: React.Dispatch<React.SetStateAction<string>>;
  setFilteredManagement: React.Dispatch<React.SetStateAction<string>>;
  filteredManagement: string;
}
