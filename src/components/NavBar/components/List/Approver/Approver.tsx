import { StyledUl, StyledLink } from "../../../styles";

type ApproverListProps = {
  listActive: string;
  activeSection: string | null;
};

export const ApproverList = ({
  listActive,
  activeSection,
}: ApproverListProps) => {
  return (
    <StyledUl className={listActive}>
      {activeSection === "aprovacao" && (
        <>
          <li>
            <StyledLink to="/dashboard/approval-requests">
              Lista de Aprovações
            </StyledLink>
          </li>
        </>
      )}
    </StyledUl>
  );
};
