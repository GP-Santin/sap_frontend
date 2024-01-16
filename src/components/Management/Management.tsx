import { useState } from "react";
import { Input } from "../Input/Input";
import { IManagement, IManagementProps } from "./@types";
import { useOutsideClick } from "../../hooks/outsideClick";
import {
  StyledProjectDropdown,
  StyledProjectsContainer,
} from "../Projects/styles";

function Management({
  setManagement,
  management,
  setmanagementCode,
}: IManagementProps) {
  const [inputValue, setInputValue] = useState(management);
  const [managementListFiltered, setManagementListFiltered] = useState<
    IManagement[]
  >([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const managementList = JSON.parse(
    localStorage.getItem("@projectmanagements") || "[]"
  );

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };

  const handleFilterManagement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setOpenDropdown(true);
    const filtered = filterManagement(value);
    setManagementListFiltered(filtered);
  };

  const filterManagement = (inputValue: string): IManagement[] => {
    return managementList.filter((management: IManagement) => {
      return (
        management.CenterCode.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        management.CenterName.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const showAllItems = () => {
    openDropdown ? closeDropdown() : handleOpenDropdown();
    setManagementListFiltered(managementList);
  };

  const handleAddItemToInput = (selectedManagement: IManagement) => {
    setManagement(selectedManagement.CenterCode);
    setInputValue(selectedManagement.CenterCode);
    setmanagementCode(selectedManagement.U_SNT_IdGerencial);

    setOpenDropdown(false);
    setManagementListFiltered([]);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledProjectsContainer>
      <Input
        label="Gerencial"
        widthsize="small2"
        style={{ cursor: "pointer" }}
        onClick={showAllItems}
        onChange={handleFilterManagement}
        value={inputValue}
      />

      {openDropdown && (
        <StyledProjectDropdown ref={dropdownRef}>
          <ul>
            {managementListFiltered.map(
              (management: IManagement, index: number) => (
                <li
                  key={index}
                  onClick={() => handleAddItemToInput(management)}
                >
                  {management.CenterCode} - {management.CenterName}
                </li>
              )
            )}
          </ul>
        </StyledProjectDropdown>
      )}
    </StyledProjectsContainer>
  );
}

export default Management;
