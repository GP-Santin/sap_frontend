import React from "react";
import { IItemRequest } from "../../../PurchaseRequests/components/Form/@types";
import {
  StyledTableContainer,
  StyledPlus,
  StyledMinus,
  StyledItemContainer,
  StyledItem,
  StyledTrashContainer,
} from "../../../PurchaseRequests/components/Form/styles";
import { FaRegTrashAlt } from "react-icons/fa";

interface TableProps {
  listItems: IItemRequest[];
  setListItems: React.Dispatch<React.SetStateAction<IItemRequest[]>>;
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
    <StyledTableContainer>
      {listItems.map((item: IItemRequest, index: number) => (
        <StyledItemContainer key={index}>
          <StyledItem>
            <h4>Código do Item</h4>
            <p>{item.ItemCode}</p>
          </StyledItem>
          <StyledItem>
            <h4>Descrição:</h4>
            <p>{item.ItemDescription}</p>
          </StyledItem>
          <StyledItem>
            <h4>Quantidade</h4>
            <div
              style={{
                display: "flex",
                gap: ".5rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledPlus onClick={() => handleIncreaseQuantity(index)} />
              <p>{item.Quantity}</p>
              <StyledMinus onClick={() => handleDecreaseQuantity(index)} />
            </div>
          </StyledItem>
          <StyledItem>
            <h4>Projeto</h4>
            <p>{item.ProjectCode}</p>
          </StyledItem>
          <StyledItem>
            <h4>Gerencial:</h4>
            <p>{item.CostingCode2}</p>
          </StyledItem>
          <StyledTrashContainer>
            <FaRegTrashAlt
              className="icon"
              size={25}
              onClick={() => handleDeleteItem(index)}
            />
          </StyledTrashContainer>
        </StyledItemContainer>
      ))}
    </StyledTableContainer>
  );
}

export default Table;
