export interface IManagement {
  CenterCode: string;
  CenterName: string;
  U_SNT_IdGerencial: string;
}

export interface IManagementProps {
  management: string;
  setManagement: React.Dispatch<React.SetStateAction<string>>;
  setmanagementCode: React.Dispatch<React.SetStateAction<string>>;
}
