import { useState } from "react";
import {
  StyledProjectDropdown,
  StyledProjectsContainer,
} from "../Projects/styles";
import { Input } from "../Input/Input";
import { useOutsideClick } from "../../hooks/outsideClick";
import { IUsage } from "../../providers/AppContext/@types";

interface IMainUsageProps {
  setUsage: React.Dispatch<React.SetStateAction<string>>;
}

function MainUsage({ setUsage }: IMainUsageProps) {
  const listUsage = JSON.parse(sessionStorage.getItem("@usage")!);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleUsageClick = (selectedUsage: IUsage) => {
    setInputValue(selectedUsage.Usage);
    const formattedId = selectedUsage.ID.toString();
    setUsage(formattedId);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledProjectsContainer>
      <Input
        label="Uso principal"
        widthsize="large3"
        onClick={handleOpenDropdown}
        defaultValue={inputValue}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <StyledProjectDropdown ref={dropdownRef}>
          <ul>
            {listUsage.map((usage: IUsage, index: number) => (
              <li key={index} onClick={() => handleUsageClick(usage)}>
                {usage.ID} - {usage.Usage}
              </li>
            ))}
          </ul>
        </StyledProjectDropdown>
      )}
    </StyledProjectsContainer>
  );
}

export default MainUsage;
