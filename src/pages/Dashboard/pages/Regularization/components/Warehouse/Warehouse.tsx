import { Input } from "../../../../../../components/Input/Input";
import { useState } from "react";
import { StyledDropdown } from "../SelectItemsRegularization/styles";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";

import { IWarehouse } from "./@types";
import { StyledWarehouseContainer, StyledWarehouseDropdown } from "./styles";

interface WarehouseProps {
  setWarehouseCode: React.Dispatch<React.SetStateAction<string>>;
  itemCode: string;
  itemDescription: string;
  warehouseCode: string;
  warehouseList: IWarehouse[];
}

function Warehouse({
  setWarehouseCode,
  itemCode,
  itemDescription,
  warehouseCode,
  warehouseList,
}: WarehouseProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledWarehouseContainer>
      {itemCode.startsWith("21") && itemDescription.length > 0 && (
        <Input
          widthsize="small2"
          label="Depósito"
          type="text"
          onClick={handleOpenDropdown}
          value={warehouseCode}
        />
      )}
      {openDropdown && (
        <StyledWarehouseDropdown ref={dropdownRef}>
          <ul>
            {warehouseList.map((warehouse, index: number) => (
              <li
                key={index}
                onClick={() => setWarehouseCode(warehouse.WarehouseCode)}
              >
                {warehouse.WarehouseCode} - {warehouse.WarehouseName}
              </li>
            ))}
          </ul>
        </StyledWarehouseDropdown>
      )}
    </StyledWarehouseContainer>
  );
}

export default Warehouse;
