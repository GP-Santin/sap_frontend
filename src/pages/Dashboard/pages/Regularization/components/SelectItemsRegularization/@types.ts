import { IItemOrder } from "../Form/@types";

export interface ISelectItemProps {
  setItems: React.Dispatch<React.SetStateAction<IItemOrder[]>>;
  setListItems: React.Dispatch<React.SetStateAction<IItemOrder[]>>;
  listItems: IItemOrder[];
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
  usage: string;
  setUsage: React.Dispatch<React.SetStateAction<string>>;
  warehouseCode: string;
  branch: string;
  setUsageInput: React.Dispatch<React.SetStateAction<string>>;
  usageInput: string;
}
