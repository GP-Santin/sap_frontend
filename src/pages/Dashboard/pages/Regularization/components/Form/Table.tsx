import React from "react";
import { IItemOrder } from "../../../PurchaseRequests/components/Form/@types";
import {
  StyledTable,
  StyledPlus,
  StyledMinus,
  StyledTrashIcon,
} from "../../../PurchaseRequests/components/Form/styles";

interface TableProps {
  listItems: IItemOrder[];
  setListItems: React.Dispatch<React.SetStateAction<IItemOrder[]>>;
}

function Table({ listItems, setListItems }: TableProps) {
  const handleIncreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems[index].Quantity += 1;
    setListItems(updatedItems);
    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    if (updatedItems[index].Quantity > 0) {
      updatedItems[index].Quantity -= 1;
      setListItems(updatedItems);
      localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems.splice(index, 1);
    setListItems(updatedItems);
    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Código do item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor total </th>
          <th>Gerencial</th>
          <th>Projeto</th>
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
            <td>R$ {item.LineTotal}</td>
            <td>{item.ProjectCode}</td>
            <td>{item.CostingCode2}</td>
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
