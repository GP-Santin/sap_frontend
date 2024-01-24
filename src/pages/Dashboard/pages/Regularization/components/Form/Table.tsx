import React, { useEffect } from "react";
import { IItemOrder } from "../../../Regularization/components/Form/@types";
import {
  StyledPlus,
  StyledMinus,
  StyledItem,
  StyledItemContainer,
  StyledTableContainer,
} from "../../../PurchaseRequests/components/Form/styles";
import { StyledIcon } from "./styles";

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

  useEffect(() => {
    setProjetDoc();
  }, [listItems]);

  return (
    <StyledTableContainer>
      {listItems.map((item: IItemOrder, index: number) => (
        <StyledItemContainer key={index}>
          <div style={{ display: "flex" }}>
            {index === 0 && (
              <>
                <StyledItem>
                  <h4>Código do Item</h4>
                </StyledItem>
                <StyledItem>
                  <h4>Descrição:</h4>
                </StyledItem>
                <StyledItem>
                  <h4>Quantidade</h4>
                </StyledItem>
                <StyledItem>
                  <h4>Valor unitário</h4>
                </StyledItem>
                <StyledItem>
                  <h4>Valor dos itens</h4>
                </StyledItem>
                <StyledItem>
                  <h4>Projeto</h4>
                </StyledItem>
                <StyledItem>
                  <h4>Gerencial:</h4>
                </StyledItem>
              </>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <StyledItem>
              <p>{item.ItemCode}</p>
            </StyledItem>
            <StyledItem>
              <p>{item.ItemDescription}</p>
            </StyledItem>
            <StyledItem>
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
            <StyledItem>R$ {item.UnitPrice}</StyledItem>
            <StyledItem>R$ {item.LineTotal}</StyledItem>
            <StyledItem>
              <p>{item.ProjectCode}</p>
            </StyledItem>
            <StyledItem>
              <p>{item.CostingCode2}</p>
            </StyledItem>
            <StyledIcon size={100} onClick={handleDeleteItem} />
          </div>
        </StyledItemContainer>
      ))}
    </StyledTableContainer>
  );
}

export default Table;
