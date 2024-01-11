import { IItemOrder } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";

export interface ISelectItemProps {
  setItems: React.Dispatch<React.SetStateAction<IItemOrder[]>>;
  setListItems: React.Dispatch<React.SetStateAction<any[]>>;
  listItems: any[];
  setProject: React.Dispatch<React.SetStateAction<string>>;
  project: string;
  management: string;
  setManagement: React.Dispatch<React.SetStateAction<string>>;
  unitPrice: string;
  setUnitPrice: React.Dispatch<React.SetStateAction<string>>;
}
