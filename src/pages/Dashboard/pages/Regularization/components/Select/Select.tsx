import { Input } from "../../../../../../components/Input/Input";
import { IBranch } from "./@types";
import { useState } from "react";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import { StyledBranchContainer, StyledBranchDropdown } from "./styles";

interface ISelectProps {
  setBranch: React.Dispatch<React.SetStateAction<string>>;
  setWarehouseCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectSmall({
  setBranch,
  setWarehouseCode,
}: ISelectProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const userBranches = JSON.parse(localStorage.getItem("@branches")!);
  const allBranches = JSON.parse(localStorage.getItem("@allBranches")!);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const handleChange = (branch: IBranch) => {
    setBranch(branch.BPLID.toString());
    setValue(branch.BPLName);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  const filterBranches = () => {
    const filteredBranches = allBranches.filter((branch: IBranch) =>
      userBranches.some(
        (userBranch: IBranch) => branch.BPLID === userBranch.BPLID
      )
    );
    return filteredBranches;
  };

  return (
    <StyledBranchContainer>
      <label htmlFor="branch">Filial</label>
      <Input
        widthsize="med2"
        style={{ width: 192, cursor: "pointer" }}
        onClick={handleOpenDropdown}
        defaultValue={value}
      />
      {openDropdown && (
        <StyledBranchDropdown ref={dropdownRef}>
          <ul>
            {filterBranches().map((branch: IBranch, index: number) => (
              <li key={index} onClick={() => handleChange(branch)}>
                {branch.BPLName}
              </li>
            ))}
          </ul>
        </StyledBranchDropdown>
      )}
    </StyledBranchContainer>
  );
}
