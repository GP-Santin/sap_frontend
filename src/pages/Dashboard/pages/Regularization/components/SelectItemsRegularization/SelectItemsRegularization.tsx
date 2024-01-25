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
import apiSAP from "../../../../../../middleware/handleRequest.middleware";

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
  branch,
  setUsageInput,
  usageInput,
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
  };

  const handleDocTotalChange = (list: IItemOrder[]) => {
    const total = list.reduce((acc, item) => {
      return acc + item.LineTotal;
    }, 0);
    setDocTotal(total.toString());
  };

  const getUsage = async () => {
    const { data } = await apiSAP.get(
      "/NotaFiscalUsage?$filter = Usage eq 'Adiantamento'"
    );
    const advanceValue = data.value[0].ID;
    localStorage.setItem("@advance", advanceValue);
  };

  useEffect(() => {
    handleDocTotalChange(listItems);
    getUsage();
  }, [listItems]);

  const handleAddItemToList = () => {
    const errorMessages = {
      item: "Selecione um item",
      quantity: "Selecione a quantidade",
      unitPrice: "Informe o preço unitário",
      project: "Selecione o projeto",
      management: "Selecione a gerencial",
      branch: "Selecione a filial",
    };

    const showErrorMessage = (field: keyof typeof errorMessages) => {
      toast.error(errorMessages[field]);
    };
    const advanceValue = JSON.parse(localStorage.getItem("@advance")!);

    if (itemCode.substring(0, 2) === "61" && Number(usage) != advanceValue) {
      toast.error(
        "Para itens com início 61 o uso principal deve ser Adiantamento"
      );
      return;
    } else {
      if (
        itemCode &&
        itemDescription &&
        quantity &&
        project &&
        management &&
        unitPrice &&
        branch
      ) {
        const newItem = {
          LineNum: listItems.indexOf(listItems[0]) + 1,
          ItemCode: itemCode,
          ItemDescription: itemDescription,
          ProjectCode: project,
          CostingCode2: management,
          U_SNT_Finalidade: "2",
          Quantity: parseFloat(quantity),
          UnitPrice: Number(unitPrice),
          LineTotal: parseFloat(lineTotal),
          WarehouseCode: warehouseCode,
          Usage: parseFloat(usage),
          U_SNT_Mercadoria: 9,
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
              U_SNT_Mercadoria: number;
            }[]
          ) => [...prevItems, newItem]
        );
        if (itemCode.substring(0, 2) === "61") {
          newItem.U_SNT_Finalidade = "5";
        }
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
        setFilteredManagement("");
        setUsage("");
        setUsageInput("");
        setFilteredItems([]);
      } else {
        if (!itemCode || !itemDescription) {
          showErrorMessage("item");
        } else if (!quantity) {
          showErrorMessage("quantity");
        } else if (!unitPrice) {
          showErrorMessage("unitPrice");
        } else if (!management) {
          showErrorMessage("management");
        } else if (!project) {
          showErrorMessage("project");
        } else if (!branch) {
          showErrorMessage("branch");
        }
      }
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
          setManagementCode={setManagementCode}
          setFilteredManagement={setFilteredManagement}
          filteredManagement={filteredManagement}
        />
        <Projects
          setProject={setProject}
          project={project}
          managementCode={managementCode}
        />
        <MainUsage
          setUsage={setUsage}
          setUsageInput={setUsageInput}
          usageInput={usageInput}
        />
        <StyledButton onClick={() => handleAddItemToList()}>
          Adicionar item
        </StyledButton>
      </StyledLineItems>
    </StyledItemContainer>
  );
};

export default SelectItemsRegularization;
