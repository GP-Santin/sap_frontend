import { IItemOrder } from "../../pages/Dashboard/pages/Regularization/components/Form/@types";

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
  docTotal: string;
  setDocTotal: React.Dispatch<React.SetStateAction<string>>;
  setLineTotal: React.Dispatch<React.SetStateAction<string>>;
  lineTotal: string;
  handleDocTotalChange: (list: IItemOrder[]) => void;
}
