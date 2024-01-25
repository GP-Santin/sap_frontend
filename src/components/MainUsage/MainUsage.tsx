import { useState } from "react";
import { StyledProjectsContainer } from "../Projects/styles";
import { Input } from "../Input/Input";
import Dropdown from "./Dropdown";

interface IMainUsageProps {
  setUsage: React.Dispatch<React.SetStateAction<string>>;
  setUsageInput: React.Dispatch<React.SetStateAction<string>>;
  usageInput: string;
}

function MainUsage({ setUsage, setUsageInput, usageInput }: IMainUsageProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <StyledProjectsContainer>
      <Input
        label="Uso principal"
        widthsize="large3"
        onClick={handleOpenDropdown}
        value={usageInput}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <Dropdown
          setOpenDropdown={setOpenDropdown}
          setUsage={setUsage}
          openDropdown={openDropdown}
          setUsageInput={setUsageInput}
        />
      )}
    </StyledProjectsContainer>
  );
}

export default MainUsage;
