import { useState } from "react";
import { Input } from "../../../../../../components/Input/Input";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import {
  StyledConsumptionContainer,
  StyledConsumptionDropdown,
} from "../SelectConsumption/styles";

interface ISelectShippingProps {
  setTransportationCode: React.Dispatch<React.SetStateAction<number>>;
}

function SelectShipping({ setTransportationCode }: ISelectShippingProps) {
  const [value, setValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const closeDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClick = (value: { label: string; value: string }) => {
    setTransportationCode(Number(value.value));
    setValue(value.label);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  const options = [
    { label: "SEM ENTREGA/CONSUMO LOCAL", value: "4" },
    { label: "TRANSPORTE AÉREO", value: "5" },
    { label: "TRANSPORTE CORREIOS", value: "6" },
    { label: "TRANSPORTE PRÓPRIO", value: "1" },
    { label: "TRANSPORTE TERCEIRO - CIF", value: "2" },
    { label: "TRANSPORTE TERCEIRO - FOB", value: "3" },
  ];

  return (
    <StyledConsumptionContainer>
      <Input
        $widthsize="large3"
        label="Forma de envio"
        onClick={() => setOpenDropdown(!openDropdown)}
        defaultValue={value}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <StyledConsumptionDropdown ref={dropdownRef}>
          <ul>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </StyledConsumptionDropdown>
      )}
    </StyledConsumptionContainer>
  );
}

export default SelectShipping;
