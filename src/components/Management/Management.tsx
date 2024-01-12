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
  const [managementList] = useState(() => {
    const storedList = localStorage.getItem("@projectmanagements");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown((prevOpenDropdown) => !prevOpenDropdown);
  };

  const handleManagementClick = (selectedManagement: IManagement) => {
    setManagement(selectedManagement.CenterCode);
    setOpenDropdown(false);
    setmanagementCode(selectedManagement.U_SNT_IdGerencial);
  };

  const closeDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledProjectsContainer>
      <Input
        label="Gerencial"
        $widthsize="small2"
        onClick={handleOpenDropdown}
        value={management}
        style={{ cursor: "pointer" }}
      />

      {openDropdown && (
        <StyledProjectDropdown ref={dropdownRef}>
          <ul>
            {managementList.map((management: IManagement, index: number) => (
              <li key={index} onClick={() => handleManagementClick(management)}>
                {management.CenterCode} | {management.CenterName}
              </li>
            ))}
          </ul>
        </StyledProjectDropdown>
      )}
    </StyledProjectsContainer>
  );
}

export default Management;
