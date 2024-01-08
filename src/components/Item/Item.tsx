import React, { useState } from "react";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/style";
import { Input } from "../Input/Input";
import { IItem } from "../../providers/AppContext/@types";
import { IItemProps } from "./@types";
import { StyledDropdown, StyledItemContainer } from "./styles";

function Item({
  setValue,
  filteredItems,
  setFilteredItems,
  errors,
}: IItemProps & { errors: any }) {
  const items = JSON.parse(localStorage.getItem("@items") || "[]");
  const [itemNumber, setItemNumber] = useState("");
  const [item, setItem] = useState("");

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

  const filterItems = (inputValue: string) => {
    return items.filter(
      (item: IItem) =>
        item.ItemCode?.toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.ItemName &&
          item.ItemName.toLowerCase().includes(inputValue.toLowerCase()))
    );
  };

  const handleItemClick = (selectedItem: IItem) => {
    setValue("ItemDescription", selectedItem.ItemName);
    setValue("ItemCode", selectedItem.ItemCode);
    setItem(selectedItem.ItemName);
    setItemNumber(selectedItem.ItemCode);
    setFilteredItems([]);
  };

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
        {errors.ItemCode ? <span>{errors.ItemCode.message}</span> : null}
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
        {errors.ItemDescription ? (
          <span>{errors.ItemDescription.message}</span>
        ) : null}
      </StyledErrorContainer>
      {filteredItems.length > 0 && (
        <StyledDropdown>
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
}

export default Item;
