import { Input } from "../../../../../../components/Input/Input";
import { useState } from "react";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import { StyledManagerialContainer, StyledManagerialDropdown } from "./styles";
import { Managerial } from "./@types";

interface ManagerialProps {
  managerial: string;
  setManagerial: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectManagerial({ setManagerial }: ManagerialProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const [] = useState("");
  const managerialsString = localStorage.getItem("@managerial");
  const managerials = managerialsString ? JSON.parse(managerialsString) : [];

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  const handleSelectManagerial = (selectedManagerial: Managerial) => {
    setManagerial(selectedManagerial.FactorCode);
    setValue(selectedManagerial.FactorCode);
    closeDropdown();
  };

  return (
    <StyledManagerialContainer>
      <Input
        widthsize="small2"
        style={{ cursor: "pointer" }}
        onClick={handleOpenDropdown}
        defaultValue={value}
        label="Corporativo"
      />
      {openDropdown && (
        <StyledManagerialDropdown ref={dropdownRef}>
          <ul>
            {managerials.map((managerialItem: Managerial, index: number) => (
              <li
                key={index}
                onClick={() => handleSelectManagerial(managerialItem)}
              >
                {managerialItem.FactorCode}
              </li>
            ))}
          </ul>
        </StyledManagerialDropdown>
      )}
    </StyledManagerialContainer>
  );
}
