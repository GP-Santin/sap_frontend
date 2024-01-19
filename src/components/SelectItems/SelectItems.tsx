import React, { useState } from "react";
import { Input } from "../Input/Input";
import { IItem } from "../../providers/AppContext/@types";
import { StyledButton, StyledItemContainer, StyledLineItems } from "./styles";
import { ISelectItemProps } from "./@types";
import Projects from "../Projects/Projects";
import Management from "../Management/Management";
import { useOutsideClick } from "../../hooks/outsideClick";
import { toast } from "react-toastify";
import { StyledDropdown } from "../SelectItemsRegularization/styles";

const SelectItems: React.FC<ISelectItemProps> = ({
  setItems,
  setListItems,
  listItems,
  setProject,
  project,
  management,
  setManagement,
  setWarehouseCode,
  warehouseCode,
}) => {
  const [itemCode, setItemCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [managementCode, setmanagementCode] = useState<string>("");
  const items: IItem[] = JSON.parse(sessionStorage.getItem("@items") || "[]");

  const filterItems = (inputValue: string): IItem[] => {
    return items.filter(
      (item: IItem) =>
        item.ItemCode?.toLowerCase().includes(inputValue.toLowerCase()) ||
        (item.ItemName &&
          item.ItemName.toLowerCase().includes(inputValue.toLowerCase()))
    );
  };
  const handleItemCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemCode(value);
    setOpenDropdown(true);
    const filtered = filterItems(value);
    setFilteredItems(filtered);
  };
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemDescription(value);
    setOpenDropdown(true);
    const filtered = filterItems(value);
    setFilteredItems(filtered);
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
    if (itemCode && itemDescription && quantity && project && management) {
      const newItem = {
        LineNum: listItems.indexOf(listItems[0]) + 1,
        ItemCode: itemCode,
        ItemDescription: itemDescription,
        Quantity: Number(quantity),
        ProjectCode: project,
        CostingCode2: management,
        U_SNT_Finalidade: "1",
        WarehouseCode: warehouseCode,
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
            WarehouseCode: string;
          }[]
        ) => [...prevItems, newItem]
      );
      const updatedItems = [...listItems, newItem];

      setListItems(updatedItems);

      sessionStorage.setItem("@savedItems", JSON.stringify(updatedItems));
      setItemCode("");
      setItemDescription("");
      setQuantity("");
      setProject("");
      setManagement("");
      setWarehouseCode("");

      setFilteredItems([]);
    } else {
      toast.error("Selecione um item antes de adicionar");
    }
  };
  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledItemContainer>
      <StyledLineItems>
        <Input
          widthsize="large3"
          label="Nº do item"
          value={itemCode}
          onChange={handleItemCodeChange}
        />
        <Input
          widthsize="large3"
          label="Item"
          defaultValue={itemDescription}
          onChange={handleItemChange}
          type="text"
          id="itemDescription"
        />
        <Input
          widthsize="small2"
          label="Quantidade"
          value={quantity}
          onChange={handleQuantityChange}
          type="text"
        />
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
