import { Input } from "../../../../../../components/Input/Input";
import { useState } from "react";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import {
  StyledConsumptionContainer,
  StyledConsumptionDropdown,
} from "./styles";

interface ISelectConsumptionProps {
  setConsumption: React.Dispatch<React.SetStateAction<string>>;
}

function SelectConsumption({ setConsumption }: ISelectConsumptionProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState<string>("");

  const closeDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClick = (value: string) => {
    setConsumption(value);
    setValue(value);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledConsumptionContainer>
      <Input
        label="Consumo"
        $widthsize="med2"
        style={{ cursor: "pointer" }}
        onClick={() => setOpenDropdown(!openDropdown)}
        defaultValue={value}
      />
      {openDropdown && (
        <StyledConsumptionDropdown ref={dropdownRef}>
          <ul>
            <li onClick={() => handleClick("Interno")}>Interno</li>
            <li onClick={() => handleClick("Externo")}>Externo</li>
          </ul>
        </StyledConsumptionDropdown>
      )}
    </StyledConsumptionContainer>
  );
}

export default SelectConsumption;
