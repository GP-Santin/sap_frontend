import { IItemRequest } from "../Form/@types";

export interface ISelectItemProps {
  setItems: React.Dispatch<React.SetStateAction<IItemRequest[]>>;
  setListItems: React.Dispatch<React.SetStateAction<IItemRequest[]>>;
  listItems: IItemRequest[];
  setProject: React.Dispatch<React.SetStateAction<string>>;
  project: string;
  management: string;
  setManagement: React.Dispatch<React.SetStateAction<string>>;
  setWarehouseCode: React.Dispatch<React.SetStateAction<string>>;
  warehouseCode: string;
  managerial: string;
  setManagerial: React.Dispatch<React.SetStateAction<string>>;
}
