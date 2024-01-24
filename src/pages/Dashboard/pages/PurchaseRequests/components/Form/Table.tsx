import React from "react";
import { IItemRequest } from "./@types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ThemeProvider, createTheme } from "@mui/material";
import { StyledIcon, StyledMinus, StyledPlus } from "./styles";

interface TableProps {
  listItems: IItemRequest[];
  setListItems: React.Dispatch<React.SetStateAction<IItemRequest[]>>;
  theme: string;
}
function TableComponent({ listItems, setListItems, theme }: TableProps) {
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
            <TableCell sx={commonCellStyle} align="center">
              Gerencial
            </TableCell>
            <TableCell sx={commonCellStyle} align="center">
              Projeto
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map((item: IItemRequest, index: number) => (
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
              <TableCell align="center">{item.CostingCode2}</TableCell>
              <TableCell align="center">{item.ProjectCode}</TableCell>
              <StyledIcon
                style={{
                  marginLeft: "1rem",
                  color: theme === "light" ? "#000000" : "#FFFFFF",
                  cursor: "pointer",
                }}
                onClick={() => handleDeleteItem(index)}
                size={20}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ThemeProvider>
  );
}

export default TableComponent;
