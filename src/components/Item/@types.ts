import { UseFormSetValue } from "react-hook-form";
import { IItem } from "../../providers/AppContext/@types";

export interface IItemProps {
  setValue: UseFormSetValue<any>;
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}
