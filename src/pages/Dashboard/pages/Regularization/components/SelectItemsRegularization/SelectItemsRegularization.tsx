import React, { useEffect, useState } from "react";
import { Input } from "../../../../../../components/Input/Input";
import { IItem } from "../../../../../../providers/AppContext/@types";
import {
  StyledButton,
  StyledDropdown,
  StyledItemContainer,
  StyledLineItems,
} from "./styles";
import { ISelectItemProps } from "./@types";
import Projects from "../../../../../../components/Projects/Projects";
import Management from "../../../../../../components/Management/Management";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import { toast } from "react-toastify";
import { IItemOrder } from "../Form/@types";
import MainUsage from "../../../../../../components/MainUsage/MainUsage";
import { debounce } from "lodash";

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
  usage,
  setUsage,
  warehouseCode,
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

  const debouncedFilterItems = debounce((inputValue: string) => {
    const filtered = filterItems(inputValue);
    setFilteredItems(filtered);
  }, 300);

  const handleItemCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemCode(value);
    setOpenDropdown(true);
    debouncedFilterItems(value);
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemDescription(value);
    setOpenDropdown(true);
    debouncedFilterItems(value);
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
    const valueFormatted = value.replace(",", ".");
    setUnitPrice(valueFormatted);

    const quantityFloat = parseFloat(quantity);
    const priceFloat = parseFloat(valueFormatted);
    const totalNumber = priceFloat * quantityFloat;
    setLineTotal(totalNumber.toString());
    console.log(totalNumber)
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
        UnitPrice: Number(unitPrice),
        LineTotal: parseFloat(lineTotal),
        WarehouseCode: warehouseCode,
        Usage: parseFloat(usage),
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
            WarehouseCode: string;
            Usage: number;
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
      setUsage("");

      setFilteredItems([]);
    } else {
      toast.error("Selecione um item antes de adicionar");
    }
  };
  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  useEffect(() => {}, []);

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
          onChange={handleQuantityChange}
          type="text"
          value={quantity}
        />
        <Input
          widthsize="small2"
          label="Preço unitário"
          type="text"
          placeholder="0,00"
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
        <MainUsage setUsage={setUsage} />
        <StyledButton onClick={() => handleAddItemToList()}>
          Adicionar item
        </StyledButton>
      </StyledLineItems>
    </StyledItemContainer>
  );
};

export default SelectItemsRegularization;
