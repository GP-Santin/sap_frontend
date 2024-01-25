import React, { useEffect } from "react";
import { IItemOrder } from "../../../Regularization/components/Form/@types";
import Table from "@mui/material/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  StyledMinus,
  StyledPlus,
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
  theme: string;
  usageInput: string;
}

function TableComponent({
  listItems,
  setListItems,
  handleDocTotalChange,
  setDocProject,
  theme,
}: TableProps) {
  const actualTheme = createTheme({
    palette: {
      mode: theme === "light" ? "light" : "dark",
      primary: {
        main: "#214966",
      },
    },
  });

  const commonCellStyle = {
    color: theme === "light" ? "#214966" : "white",
    backgroundColor: theme === "light" ? "#FFFFFF" : "#1f1f1f",
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems[index].Quantity += 1;
    updatedItems[index].LineTotal =
      updatedItems[index].UnitPrice * updatedItems[index].Quantity;

    setListItems(updatedItems);
    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    if (updatedItems[index].Quantity > 0) {
      updatedItems[index].Quantity -= 1;
      updatedItems[index].LineTotal =
        updatedItems[index].UnitPrice * updatedItems[index].Quantity;

      setListItems(updatedItems);
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
    <ThemeProvider theme={actualTheme}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={commonCellStyle}>Código do Item</TableCell>
            <TableCell sx={commonCellStyle} align="center">
              Descrição do item
            </TableCell>
            <TableCell sx={commonCellStyle} align="left">
              Quantidade
            </TableCell>
            <TableCell sx={commonCellStyle} align="left">
              Valor unitário
            </TableCell>
            <TableCell sx={commonCellStyle} align="left">
              Valor total dos itens
            </TableCell>
            <TableCell sx={commonCellStyle} align="center">
              Gerencial
            </TableCell>
            <TableCell sx={commonCellStyle} align="center">
              Projeto
            </TableCell>
            <TableCell sx={commonCellStyle} align="center">
              Utilização
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map((item: IItemOrder, index: number) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                position: "relative",
              }}
            >
              <TableCell component="th" scope="row">
                {item.ItemCode}
              </TableCell>
              <TableCell align="center">{item.ItemDescription}</TableCell>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "1rem",
                }}
              >
                <StyledMinus onClick={() => handleDecreaseQuantity(index)} />
                <TableCell align="center">{item.Quantity}</TableCell>
                <StyledPlus onClick={() => handleIncreaseQuantity(index)} />
              </div>
              <TableCell align="left">R$ {item.UnitPrice}</TableCell>
              <TableCell align="left">R$ {item.LineTotal}</TableCell>
              <TableCell align="center">{item.CostingCode2}</TableCell>
              <TableCell align="center">{item.ProjectCode}</TableCell>
              <TableCell align="center">{item.Usage}</TableCell>
              <StyledIcon
                style={{ color: theme === "light" ? "#000000" : "#FFFFFF" }}
                onClick={() => handleDeleteItem(index)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
}

export default TableComponent;
