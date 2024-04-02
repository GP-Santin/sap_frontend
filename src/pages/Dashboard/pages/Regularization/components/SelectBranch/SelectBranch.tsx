import { Input } from "../../../../../../components/Input/Input";
import { IBranch } from "./@types";
import { useState } from "react";
import { useOutsideClick } from "../../../../../../hooks/outsideClick";
import { StyledBranchContainer, StyledBranchDropdown } from "./styles";

interface ISelectProps {
  setBranch: React.Dispatch<React.SetStateAction<string>>;
  setWarehouseCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectBranch({
  setBranch,
  setWarehouseCode,
}: ISelectProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const userbranches: IBranch[] = JSON.parse(
    localStorage.getItem("@userbranches") || "[]"
  );
  const allbranches: IBranch[] = JSON.parse(
    localStorage.getItem("@allbranches") || "[]"
  );

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const handleChange = (branch: IBranch) => {
    const selectedBranch = branch.BPLID;
    const handleSetWarehouseCode = () => {
      const branchFiltered: IBranch[] = allbranches.filter(
        (branch: IBranch) => selectedBranch === branch.BPLID
      );
      const actualBranch = branchFiltered[0].DefaultWarehouseID;
      setWarehouseCode(actualBranch);
    };
    handleSetWarehouseCode();
    setBranch(branch.BPLID.toString());
    setValue(branch.BPLName);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  const filterBranches = () => {
    const filteredBranches = allbranches.filter((branch: IBranch) =>
      userbranches.some(
        (userBranch: IBranch) => branch.BPLID === userBranch.BPLID
      )
    );
    return filteredBranches;
  };

  return (
    <StyledBranchContainer>
      <Input
        widthsize="med2"
        style={{ width: 192, cursor: "pointer" }}
        onClick={handleOpenDropdown}
        defaultValue={value}
        label="Filial"
      />
      {openDropdown &&
        (userbranches.length > 0 ? (
          <StyledBranchDropdown ref={dropdownRef}>
            <ul>
              {filterBranches().map((branch: IBranch, index: number) => (
                <li key={index} onClick={() => handleChange(branch)}>
                  {branch.BPLName}
                </li>
              ))}
            </ul>
          </StyledBranchDropdown>
        ) : (
          <StyledBranchDropdown
            style={{ padding: "1rem 0.5rem", justifyContent: "center" }}
          >
            <p>Nenhuma filial atribuída ao usuário</p>
          </StyledBranchDropdown>
        ))}
    </StyledBranchContainer>
  );
}
