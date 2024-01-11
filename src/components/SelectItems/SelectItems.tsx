import React, { useState } from "react";
import { Input } from "../Input/Input";
import { IItem } from "../../providers/AppContext/@types";
import {
  StyledButton,
  StyledDropdown,
  StyledItemContainer,
  StyledLineItems,
} from "./styles";
import { useFormContext } from "react-hook-form";
import { ISelectItemProps } from "./@types";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/styles";
import Projects from "../Projects/Projects";
import Management from "../Management/Management";
import { useOutsideClick } from "../../hooks/outsideClick";

const SelectItems: React.FC<ISelectItemProps> = ({
  setItems,
  setListItems,
  listItems,
  setProject,
  project,
  management,
  setManagement,
}) => {
  const [itemCode, setItemCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [managementCode, setmanagementCode] = useState<string>("");

  const {
    formState: { errors },
  } = useFormContext();

  const items: IItem[] = JSON.parse(localStorage.getItem("@items") || "[]");

  const handleItemCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemCode(value);
    setOpenDropdown(true);
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
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemDescription(value);
    setOpenDropdown(true);
    const filtered = filterItems(value);
    setFilteredItems(filtered);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
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
        CostingCode2: management,
        U_SNT_Finalidade: "1",
      };

      setItems(
        (
          prevItems: {
            ItemCode: string;
            ItemDescription: string;
            Quantity: number;
            ProjectCode: string;
            CostingCode2: string;
            U_SNT_Finalidade: string;
          }[]
        ) => [...prevItems, newItem]
      );
      const updatedItems = [...listItems, newItem];

      setListItems(updatedItems);

      localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
      setItemCode("");
      setItemDescription("");
      setQuantity(0);
      setProject("");
      setManagement("");

      setFilteredItems([]);
    }
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledItemContainer>
      <StyledLineItems>
        <StyledErrorContainer>
          <Input
            $widthsize="med2"
            label="Nº do item"
            value={itemCode}
            onChange={handleItemCodeChange}
            type="text"
          />
          {errors && errors.DocumentLines?.message && (
            <span>{String(errors.DocumentLines.message)}</span>
          )}
        </StyledErrorContainer>
        <StyledErrorContainer>
          <Input
            $widthsize="large3"
            label="Item"
            defaultValue={itemDescription}
            onChange={handleItemChange}
            type="text"
            id="itemDescription"
          />
        </StyledErrorContainer>
        <StyledErrorContainer>
          <Input
            $widthsize="med2"
            label="Quantidade"
            defaultValue={quantity}
            onChange={handleQuantityChange}
            type="text"
          />
        </StyledErrorContainer>
        {filteredItems.length > 0 && openDropdown && (
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
        <Management
          setManagement={setManagement}
          management={management}
          setmanagementCode={setmanagementCode}
        />
        <Projects
          setProject={setProject}
          project={project}
          managementCode={managementCode}
        />
        <StyledButton onClick={() => handleAddItemToList()}>
          Adicionar item
        </StyledButton>
      </StyledLineItems>
    </StyledItemContainer>
  );
};

export default SelectItems;
