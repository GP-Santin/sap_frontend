import { useState } from "react";
import { Input } from "../Input/Input";
import { IManagement, IManagementProps } from "./@types";
import { StyledProjectsContainer } from "../Projects/styles";
import Dropdown from "./Dropdown";

function Management({ setManagement, setManagementCode }: IManagementProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [managementListFiltered, setManagementListFiltered] = useState<
    IManagement[]
  >([]);
  const [filteredManagement, setFilteredManagement] = useState("");
  const managementList = JSON.parse(
    localStorage.getItem("@projectmanagements") || "[]"
  );

  const showAllItems = () => {
    setOpenDropdown(!openDropdown);
    setManagementListFiltered(managementList);
  };

  const handleFilterManagement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilteredManagement(value);
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

  return (
    <StyledProjectsContainer>
      <Input
        label="Gerencial"
        widthsize="small2"
        style={{ cursor: "pointer" }}
        onClick={showAllItems}
        onChange={handleFilterManagement}
        value={filteredManagement}
      />
      {openDropdown && (
        <Dropdown
          openDropdown={openDropdown}
          setManagement={setManagement}
          setOpenDropdown={setOpenDropdown}
          setManagementCode={setManagementCode}
          managementListFiltered={managementListFiltered}
          setManagementListFiltered={setManagementListFiltered}
          setFilteredManagement={setFilteredManagement}
        />
      )}
    </StyledProjectsContainer>
  );
}

export default Management;
