export interface IManagement {
  FactorCode: string;
  FactorDescription: string;
}

export interface IManagementProps {
  management: string;
  setManagement: React.Dispatch<React.SetStateAction<string>>;
}
