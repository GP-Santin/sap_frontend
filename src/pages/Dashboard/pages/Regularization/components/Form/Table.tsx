import React, { useEffect } from "react";
import { IItemOrder } from "../../../Regularization/components/Form/@types";
import {
  StyledTable,
  StyledPlus,
  StyledMinus,
  StyledTrashIcon,
} from "../../../PurchaseRequests/components/Form/styles";
import { IUsage } from "../../../../../../providers/AppContext/@types";

interface TableProps {
  listItems: IItemOrder[];
  setListItems: React.Dispatch<React.SetStateAction<IItemOrder[]>>;
  handleDocTotalChange: (list: IItemOrder[]) => void;
  setDocTotal: React.Dispatch<React.SetStateAction<string>>;
  setLineTotal: React.Dispatch<React.SetStateAction<string>>;
  lineTotal: string;
  setDocProject: React.Dispatch<React.SetStateAction<string>>;
}

function Table({
  listItems,
  setListItems,
  handleDocTotalChange,
  setDocProject,
}: TableProps) {
  const handleIncreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems[index].Quantity += 1;
    setListItems(updatedItems);
    updatedItems[index].LineTotal =
      updatedItems[index].UnitPrice * updatedItems[index].Quantity;

    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    if (updatedItems[index].Quantity > 0) {
      updatedItems[index].Quantity -= 1;
      setListItems(updatedItems);
      listItems[index].LineTotal =
        listItems[index].UnitPrice * listItems[index].Quantity;
      localStorage.setItem("@savedItems", JSON.stringify(updatedItems));

      handleDocTotalChange(updatedItems);
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems.splice(index, 1);
    setListItems(updatedItems);
    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
    handleDocTotalChange(updatedItems);
  };

  const setProjetDoc = () => {
    if (listItems.length > 0) {
      const project = listItems[0].ProjectCode;
      setDocProject(project);
    }
  };

  const getUsageDescription = (item: IItemOrder): string => {
    const localStorageUsage = JSON.parse(
      localStorage.getItem("@usage") || "[]"
    );

    const usageId = item.Usage;

    if (localStorageUsage.some((usage: IUsage) => usage.ID === usageId)) {
      const matchedUsage = localStorageUsage.find(
        (usage: IUsage) => usage.ID === usageId
      );

      return matchedUsage ? matchedUsage.Usage : "";
    }

    return "";
  };

  useEffect(() => {
    setProjetDoc();
  }, [listItems]);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Código do item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Valor total </th>
          <th>Gerencial</th>
          <th>Projeto</th>
          <th>Uso</th>
        </tr>
      </thead>
      <tbody>
        {listItems.map((item: IItemOrder, index: number) => (
          <tr key={index}>
            <td>{item.ItemCode}</td>
            <td>{item.ItemDescription}</td>
            <td className="quantity">
              <StyledPlus onClick={() => handleIncreaseQuantity(index)} />
              {item.Quantity}
              <StyledMinus onClick={() => handleDecreaseQuantity(index)} />
            </td>
            <td>R$ {item.UnitPrice}</td>
            <td>R$ {item.LineTotal}</td>
            <td>{item.CostingCode2}</td>
            <td>{item.ProjectCode}</td>
            <td>{getUsageDescription(item)}</td>
            <td>
              <StyledTrashIcon onClick={() => handleDeleteItem(index)} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default Table;
