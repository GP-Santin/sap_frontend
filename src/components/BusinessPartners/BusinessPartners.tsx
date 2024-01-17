import React, { useEffect, useState } from "react";
import { IBusinessPartner } from "../../providers/AppContext/@types";
import { Input } from "../Input/Input";
import {
  StyledBusinessPartnersContainer,
  StyledBusinessPartnersDropdown,
} from "./styles";
import { BusinessPartnerProps } from "./@types";
import { useOutsideClick } from "../../hooks/outsideClick";

function BusinessPartners({
  setBusinessPartner,
  businessPartner,
}: BusinessPartnerProps) {
  const [businessPartnersFiltered, setBusinessPartnersFiltered] = useState<
    IBusinessPartner[]
  >([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  const businessPartners: IBusinessPartner[] = JSON.parse(
    localStorage.getItem("@businesspartners") || "[]"
  );

  useEffect(() => {});

  const handleFilterBusinessPartners = (
    inputValue: string
  ): IBusinessPartner[] => {
    return businessPartners.filter(
      (businessPartner) =>
        businessPartner.CardCode.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        businessPartner.CardName.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        businessPartner.FederalTaxID.toLocaleLowerCase().includes(
          inputValue.toLocaleLowerCase()
        )
    );
  };

  const addBusinessPartnerToInput = (businessPartner: IBusinessPartner) => {
    setBusinessPartner(businessPartner.CardCode);
    setOpenDropdown(false);
  };

  const handleBusinessPartnerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setBusinessPartner(value);
    setOpenDropdown(true);
    const filtered = handleFilterBusinessPartners(value);
    setBusinessPartnersFiltered(filtered);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledBusinessPartnersContainer>
      <Input
        widthsize="large3"
        label="Fornecedor"
        onChange={handleBusinessPartnerChange}
        value={businessPartner}
      />
      {openDropdown && businessPartnersFiltered.length > 0 && (
        <StyledBusinessPartnersDropdown ref={dropdownRef}>
          <ul>
            {businessPartnersFiltered.map((filteredPartner) => (
              <li
                key={filteredPartner.CardCode}
                onClick={() => addBusinessPartnerToInput(filteredPartner)}
              >
                {filteredPartner.CardCode} - {filteredPartner.CardName} -{" "}
                {filteredPartner.FederalTaxID}
              </li>
            ))}
          </ul>
        </StyledBusinessPartnersDropdown>
      )}
    </StyledBusinessPartnersContainer>
  );
}

export default BusinessPartners;
