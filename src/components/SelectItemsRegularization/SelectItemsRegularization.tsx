import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { IItem } from "../../providers/AppContext/@types";
import {
  StyledButton,
  StyledDropdown,
  StyledItemContainer,
  StyledLineItems,
} from "./styles";
import { ISelectItemProps } from "./@types";
import Projects from "../Projects/Projects";
import Management from "../Management/Management";
import { useOutsideClick } from "../../hooks/outsideClick";
import { toast } from "react-toastify";
import { IItemOrder } from "../../pages/Dashboard/pages/Regularization/components/Form/@types";

const SelectItemsRegularization: React.FC<ISelectItemProps> = ({
  setItems,
  setListItems,
  listItems,
  setProject,
  project,
  management,
  setManagement,
  unitPrice,
  setUnitPrice,
  setDocTotal,
  lineTotal,
  setLineTotal,
}) => {
  const [itemCode, setItemCode] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [managementCode, setmanagementCode] = useState<string>("");

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

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(",", ".");
    setUnitPrice(formattedValue);

    const quantityFloat = parseFloat(quantity);

    const totalNumber = parseFloat(value) * quantityFloat;
    setLineTotal(totalNumber.toString());
  };

  const handleDocTotalChange = (list: IItemOrder[]) => {
    const total = list.reduce((acc, item) => {
      return acc + item.LineTotal;
    }, 0);
    setDocTotal(total.toString());
  };

  useEffect(() => {
    handleDocTotalChange(listItems);
  }, [listItems]);

  const handleAddItemToList = () => {
    if (
      itemCode &&
      itemDescription &&
      quantity &&
      project &&
      management &&
      unitPrice 
    ) {
      const newItem = {
        LineNum: listItems.indexOf(listItems[0]) + 1,
        ItemCode: itemCode,
        ItemDescription: itemDescription,
        ProjectCode: project,
        CostingCode2: management,
        U_SNT_Finalidade: "1",
        Quantity: parseFloat(quantity),
        UnitPrice: parseFloat(unitPrice),
        LineTotal: parseFloat(lineTotal),
      };
      setItems(
        (
          prevItems: {
            ItemCode: string;
            ItemDescription: string;
            Quantity: number;
            ProjectCode: string;
            CostingCode2: string;
            UnitPrice: number;
            U_SNT_Finalidade: string;
            LineTotal: number;
          }[]
        ) => [...prevItems, newItem]
      );
      const updatedItems = [...listItems, newItem];

      setListItems(updatedItems);

      localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
      setItemCode("");
      setItemDescription("");
      setQuantity("");
      setProject("");
      setUnitPrice("");
      setManagement("");

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
          $widthsize="large3"
          label="Nº do item"
          value={itemCode}
          onChange={handleItemCodeChange}
        />
        <Input
          $widthsize="large3"
          label="Item"
          defaultValue={itemDescription}
          onChange={handleItemChange}
          type="text"
          id="itemDescription"
        />
        <Input
          $widthsize="small2"
          label="Quantidade"
          onChange={handleQuantityChange}
          type="text"
          value={quantity}
        />
        <Input
          $widthsize="small2"
          label="Preço unitário"
          type="text"
          placeholder="0.00"
          span="R$"
          style={{ paddingLeft: "2rem" }}
          onChange={handleUnitPriceChange}
          value={unitPrice}
        />
        {filteredItems.length > 0 && openDropdown && (
          <StyledDropdown ref={dropdownRef}>
            <ul>
              {filteredItems.map((filteredItem, index) => (
                <li key={index} onClick={() => addItemToInput(filteredItem)}>
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

export default SelectItemsRegularization;
