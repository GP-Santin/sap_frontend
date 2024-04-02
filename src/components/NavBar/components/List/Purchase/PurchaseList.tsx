import { StyledUl, StyledLink } from "../../../styles";

type PurchaseListProps = {
  listActive: string;
  activeSection: string | null;
};

export const PurchaseList = ({
  listActive,
  activeSection,
}: PurchaseListProps) => {
  return (
    <StyledUl className={listActive}>
      {activeSection === "compras" && (
        <>
          <li>
            <StyledLink to="/dashboard/purchase-requests">
              Solicitação de Compras
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/dashboard/regularization">
              Regularização de NFe
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/dashboard/purchase-requests/open-items">
              Lista de Itens em aberto
            </StyledLink>
          </li>
        </>
      )}
    </StyledUl>
  );
};
