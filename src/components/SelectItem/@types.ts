import { IItemRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";

export interface ISelectItemProps {
  setItems: React.Dispatch<React.SetStateAction<IItemRequest[]>>;
  setListItems: React.Dispatch<React.SetStateAction<any[]>>;
  listItems: any[];
  setProject: React.Dispatch<React.SetStateAction<string>>;
  project: string;
}
