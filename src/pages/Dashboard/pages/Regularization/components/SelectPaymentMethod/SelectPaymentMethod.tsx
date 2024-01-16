import { useState } from "react";
import {
  StyledConsumptionContainer,
  StyledConsumptionDropdown,
} from "../SelectConsumption/styles";
import { Input } from "../../../../../../components/Input/Input";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";

interface ISelectPaymentMethodProps {
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}

function SelectPaymentMethod({ setPaymentMethod }: ISelectPaymentMethodProps) {
  const [value, setValue] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const options = [
    { label: "Boleto", value: "B" },
    { label: "Transf. Bancária", value: "T" },
    { label: "Pix", value: "P" },
  ];

  const closeDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClick = (value: { label: string; value: string }) => {
    setPaymentMethod(value.value);
    setValue(value.label);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledConsumptionContainer>
      <Input
        label="Forma de pagamento"
        widthsize="large3"
        style={{ cursor: "pointer" }}
        onClick={() => setOpenDropdown(!openDropdown)}
        defaultValue={value}
      />
      {openDropdown && (
        <StyledConsumptionDropdown ref={dropdownRef}>
          <ul>
            {options.map((option) => (
              <li key={option.value} onClick={() => handleClick(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </StyledConsumptionDropdown>
      )}
    </StyledConsumptionContainer>
  );
}

export default SelectPaymentMethod;
