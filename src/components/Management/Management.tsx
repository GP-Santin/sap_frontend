import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";
import { useEffect, useRef, useState } from "react";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/style";
import { Input } from "../Input/Input";
import { StyledDropdown } from "../SelectItem/styles";
import { IManagement } from "./@types";

export interface IManagementProps {
  errors: FieldErrors<IPurchaseRequest>;
  management: string;
  setManagement: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<IPurchaseRequest>;
}
function Management({ errors, management, setManagement }: IManagementProps) {
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
      {errors.DocumentLines && errors.DocumentLines![0]?.CostingCode2 ? (
        <span>{errors.DocumentLines![0]?.CostingCode2.message}</span>
      ) : null}
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
