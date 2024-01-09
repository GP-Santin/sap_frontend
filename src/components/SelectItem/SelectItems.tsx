import React, { useEffect, useRef, useState } from "react";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/style";
import { Input } from "../Input/Input";
import { IItem } from "../../providers/AppContext/@types";
import { StyledDropdown, StyledItemContainer } from "./styles";
import { FieldErrors, useFormContext } from "react-hook-form";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";

interface ISelectItemProps {
  setItems: React.Dispatch<
    React.SetStateAction<
      {
        ItemCode: string;
        ItemDescription: string;
      }[]
    >
  >;
}

const SelectItem: React.FC<ISelectItemProps> = ({ setItems }) => {
  const [itemNumber, setItemNumber] = useState("");
  const [item, setItem] = useState("");
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const items: IItem[] = JSON.parse(localStorage.getItem("@items") || "[]");

  const handleItemNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemNumber(value);
    const filtered = filterItems(value);
    setFilteredItems(filtered);
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItem(value);
    const filtered = filterItems(value);
    setFilteredItems(filtered);
  };

  const filterItems = (inputValue: string): IItem[] => {
    return items.filter(
      (item: IItem) =>
        item.ItemCode?.toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.ItemName &&
          item.ItemName.toLowerCase().includes(inputValue.toLowerCase()))
    );
  };

  const handleItemClick = (selectedItem: IItem) => {
    const newItem = {
      ItemCode: selectedItem.ItemCode,
      ItemDescription: selectedItem.ItemName,
    };

    setValue("ItemCode", selectedItem.ItemCode);
    setValue("ItemDescription", selectedItem.ItemName);

    setItems((prevItems: { ItemCode: string; ItemDescription: string }[]) => [
      ...prevItems,
      newItem,
    ]);
    setItemNumber(selectedItem.ItemCode);
    setItem(selectedItem.ItemName);
    setFilteredItems([]);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledItemContainer>
      <StyledErrorContainer>
        <Input
          widthsize="small2"
          label="Nº do item"
          value={itemNumber}
          onChange={handleItemNumberChange}
          type="text"
        />
      </StyledErrorContainer>
      <StyledErrorContainer>
        <Input
          widthsize="large3"
          label="Item"
          value={item}
          onChange={handleItemChange}
          type="text"
          id="itemDescription"
        />
      </StyledErrorContainer>
      {filteredItems.length > 0 && (
        <StyledDropdown ref={dropdownRef}>
          <ul>
            {filteredItems.map((filteredItem) => (
              <li
                key={filteredItem.ItemCode}
                onClick={() => handleItemClick(filteredItem)}
              >
                {filteredItem.ItemCode} - {filteredItem.ItemName}
              </li>
            ))}
          </ul>
        </StyledDropdown>
      )}
    </StyledItemContainer>
  );
};

export default SelectItem;
