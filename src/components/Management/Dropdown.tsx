import { useRef } from "react";
import { StyledProjectDropdown } from "../Projects/styles";
import { IManagement } from "./@types";
import { useOutsideClick } from "../../hooks/outsideClick";

interface IDropdownProps {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  openDropdown: boolean;
  setManagement: React.Dispatch<React.SetStateAction<string>>;
  setManagementCode: React.Dispatch<React.SetStateAction<string>>;
  setManagementListFiltered: React.Dispatch<
    React.SetStateAction<IManagement[]>
  >;
  managementListFiltered: IManagement[];
  setFilteredManagement: React.Dispatch<React.SetStateAction<string>>;
}

function Dropdown({
  setOpenDropdown,
  setManagement,
  setManagementCode,
  setManagementListFiltered,
  managementListFiltered,
  setFilteredManagement,
}: IDropdownProps) {

  const handleAddItemToInput = (selectedManagement: IManagement) => {
    setManagement(selectedManagement.CenterCode);
    setManagementCode(selectedManagement.U_SNT_IdGerencial);
    setFilteredManagement(selectedManagement.CenterName);

    setOpenDropdown(false);
    setManagementListFiltered([]);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  useOutsideClick({ callback: closeDropdown });

  const dropdownRef = useRef(null);
  return (
    <StyledProjectDropdown ref={dropdownRef}>
      <ul>
        {managementListFiltered.map(
          (management: IManagement, index: number) => (
            <li key={index} onClick={() => handleAddItemToInput(management)}>
              {management.CenterCode} - {management.CenterName}
            </li>
          )
        )}
      </ul>
    </StyledProjectDropdown>
  );
}

export default Dropdown;
