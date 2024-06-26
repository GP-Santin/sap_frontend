import React, { useState } from "react";
import { Input } from "../../../../../../components/Input/Input";
import { IItem } from "../../../../../../providers/AppContext/@types";
import { StyledButton, StyledItemContainer, StyledLineItems } from "./styles";
import { ISelectItemProps } from "./@types";
import Projects from "../../../../../../components/Projects/Projects";
import Management from "../../../../../../components/Management/Management";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import { toast } from "react-toastify";
import { StyledDropdown } from "../../../Regularization/components/SelectItemsRegularization/styles";
import SelectManagerial from "../ManagerialDropdown/ManagerialDropdown";
import { IItemRequest } from "../Form/@types";

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
  managerial,
  setManagerial,
}) => {
  const [itemCode, setItemCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [managementCode, setManagementCode] = useState<string>("");
  const [filteredManagement, setFilteredManagement] = useState("");
  const items: IItem[] = JSON.parse(localStorage.getItem("@items") || "[]");

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
        CostingCode: managerial,
      };

      setItems((prevItems: IItemRequest[]) => [
        ...prevItems,
        {
          ItemCode: itemCode,
          ItemDescription: itemDescription,
          Quantity: Number(quantity),
          ProjectCode: project,
          CostingCode2: management,
          U_SNT_Finalidade: "1",
          WarehouseCode: warehouseCode,
          CostingCode: managerial,
        },
      ]);
      const updatedItems = [...listItems, newItem];

      setListItems(updatedItems);

      localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
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
          value={itemDescription}
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
          setManagementCode={setManagementCode}
          setFilteredManagement={setFilteredManagement}
          filteredManagement={filteredManagement}
        />
        <Projects
          setProject={setProject}
          project={project}
          managementCode={managementCode}
        />
        {project.substring(5, 7) === "99" ? (
          <SelectManagerial
            setManagerial={setManagerial}
            managerial={managerial}
          />
        ) : null}
        <StyledButton onClick={() => handleAddItemToList()}>
          Adicionar item
        </StyledButton>
      </StyledLineItems>
    </StyledItemContainer>
  );
};

export default React.memo(SelectItems);
