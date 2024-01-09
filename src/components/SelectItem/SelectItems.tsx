import React, { useRef, useState } from "react";
import { Input } from "../Input/Input";
import { IItem } from "../../providers/AppContext/@types";
import { StyledDropdown, StyledItemContainer } from "./styles";
import { useFormContext } from "react-hook-form";
import { ISelectItemProps } from "./@types";
import { Button } from "../Button/Button";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/styles";
import Projects from "../Projects/Projects";

const SelectItems: React.FC<ISelectItemProps> = ({
  setItems,
  setListItems,
  listItems,
  setProject,
  project,
}) => {
  const [itemCode, setItemCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const items: IItem[] = JSON.parse(localStorage.getItem("@items") || "[]");

  const handleItemCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemCode(value);
    const filtered = filterItems(value);
    setFilteredItems(filtered);
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemDescription(value);
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const addItemToInput = (selectedItem: IItem) => {
    setItemCode(selectedItem.ItemCode);
    setItemDescription(selectedItem.ItemName);
    setFilteredItems([]);
  };

  const handleAddItemToList = () => {
    if (itemCode && itemDescription) {
      const newItem = {
        LineNum: listItems.indexOf(listItems[0]) + 1,
        ItemCode: itemCode,
        ItemDescription: itemDescription,
        Quantity: quantity,
        ProjectCode: project,
        // CostingCode2: management
      };

      setItems(
        (
          prevItems: {
            ItemCode: string;
            ItemDescription: string;
            Quantity: string;
            ProjectCode: string;
          }[]
        ) => [...prevItems, newItem]
      );

      setListItems([...listItems, newItem]);

      setItemCode("");
      setItemDescription("");
      setQuantity("");
      setProject("");

      setFilteredItems([]);
    }
  };

  return (
    <StyledItemContainer>
      <StyledErrorContainer>
        <Input
          widthsize="small2"
          label="Nº do item"
          value={itemCode}
          onChange={handleItemCodeChange}
          type="text"
        />
      </StyledErrorContainer>
      <StyledErrorContainer>
        <Input
          widthsize="large3"
          label="Item"
          value={itemDescription}
          onChange={handleItemChange}
          type="text"
          id="itemDescription"
        />
      </StyledErrorContainer>
      <StyledErrorContainer>
        <Input
          widthsize="small2"
          label="Quantidade"
          value={quantity}
          onChange={handleQuantityChange}
          type="text"
        />
      </StyledErrorContainer>
      {filteredItems.length > 0 && (
        <StyledDropdown ref={dropdownRef}>
          <ul>
            {filteredItems.map((filteredItem) => (
              <li
                key={filteredItem.ItemCode}
                onClick={() => addItemToInput(filteredItem)}
              >
                {filteredItem.ItemCode} - {filteredItem.ItemName}
              </li>
            ))}
          </ul>
        </StyledDropdown>
      )}
      <Projects setProject={setProject} project={project} />
      <Button
        name="Adicionar item"
        widthsize="med2"
        color="outline-black"
        style={{ marginTop: "1rem" }}
        onClick={() => handleAddItemToList()}
      />
    </StyledItemContainer>
  );
};

export default SelectItems;
