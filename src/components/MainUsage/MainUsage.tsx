import { useState } from "react";
import { StyledProjectsContainer } from "../Projects/styles";
import { Input } from "../Input/Input";
import Dropdown from "./Dropdown";

interface IMainUsageProps {
  setUsage: React.Dispatch<React.SetStateAction<string>>;
}

function MainUsage({ setUsage }: IMainUsageProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <StyledProjectsContainer>
      <Input
        label="Uso principal"
        widthsize="large3"
        onClick={handleOpenDropdown}
        value={inputValue}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <Dropdown
          setOpenDropdown={setOpenDropdown}
          setUsage={setUsage}
          setInputValue={setInputValue}
          openDropdown={openDropdown}
        />
      )}
    </StyledProjectsContainer>
  );
}

export default MainUsage;
