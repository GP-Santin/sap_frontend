import React, { useState } from "react";
import { IBusinessPartner } from "../../providers/AppContext/@types";
import { Input } from "../Input/Input";
import {
  StyledBusinessPartnersContainer,
  StyledBusinessPartnersDropdown,
} from "./styles";
import { BusinessPartnerProps } from "./@types";

function BusinessPartners({ setBusinessPartner, businessPartner }: BusinessPartnerProps) {
  const [businessPartnersFiltered, setBusinessPartnersFiltered] = useState<
    IBusinessPartner[]
  >([]);
  const [businessDropdown, setBusinessDropdown] = useState<boolean>(false);
  const businessPartners: IBusinessPartner[] = JSON.parse(
    localStorage.getItem("@businesspartners") || "[]"
  );

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
        )
    );
  };

  const addBusinessPartnerToInput = (businessPartner: IBusinessPartner) => {
    setBusinessPartner(businessPartner.CardCode);
    setBusinessDropdown(false);
  };

  const handleBusinessPartnerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setBusinessPartner(value);
    setBusinessDropdown(true);
    const filtered = handleFilterBusinessPartners(value);
    setBusinessPartnersFiltered(filtered);
  };
  return (
    <StyledBusinessPartnersContainer>
      <Input
        $widthsize="large3"
        label="Fornecedor"
        style={{ maxWidth: "12rem" }}
        onChange={handleBusinessPartnerChange}
        value={businessPartner}
      />
      {businessPartnersFiltered.length > 0 && businessDropdown && (
        <StyledBusinessPartnersDropdown>
          <ul>
            {businessPartnersFiltered.map((filteredPartner) => (
              <li
                key={filteredPartner.CardCode}
                onClick={() => {
                  addBusinessPartnerToInput(filteredPartner);
                  setBusinessDropdown(false);
                }}
              >
                {filteredPartner.CardCode} - {filteredPartner.CardName}
              </li>
            ))}
          </ul>
        </StyledBusinessPartnersDropdown>
      )}
    </StyledBusinessPartnersContainer>
  );
}

export default BusinessPartners;
