import { useEffect, useRef, useState } from "react";
import { Input } from "../Input/Input";
import { StyledDropdown } from "../SelectItems/styles";
import { IManagement, IManagementProps } from "./@types";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/styles";

function Management({ setManagement, management }: IManagementProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [managementList, setManagementList] = useState(() => {
    const storedList = localStorage.getItem("@projectmanagements");
    return storedList ? JSON.parse(storedList) : [];
  });
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown((prevOpenDropdown) => !prevOpenDropdown);
  };

  const handleManagementClick = (selectedManagement: string) => {
    setManagement(selectedManagement);
    setOpenDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledErrorContainer>
      <Input
        label="Gerencial"
        widthsize="small2"
        onClick={handleOpenDropdown}
        value={management}
        style={{ cursor: "pointer" }}
      />

      {openDropdown && (
        <StyledDropdown ref={dropdownRef}>
          <ul>
            {managementList.map((management: IManagement, index: number) => (
              <li
                key={index}
                onClick={() => handleManagementClick(management.FactorCode)}
              >
                {management.FactorDescription} | {management.FactorCode}
              </li>
            ))}
          </ul>
        </StyledDropdown>
      )}
    </StyledErrorContainer>
  );
}

export default Management;
