import { StyledList, StyledMenu } from "../../styles";
import { useManagerContext } from "../../../../providers/ManagerContext/ManagerProvider";
import { useContext } from "react";
import { UserContext } from "../../../../providers/UserContext/UserContext";
import { ListTitle } from "../Burguer/ListTitle";
import { PurchaseList } from "./Purchase/PurchaseList";
import { ApproverList } from "./Approver/Approver";

type ListProps = {
  menuClass: string;
  listActive: string;
  activeSection: string | null;
  toggleSection: (sectionId: string) => void;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
};

export const List = ({
  menuClass,
  listActive,
  toggleSection,
  toggleDropdown,
  activeSection,
  dropdownRef,
}: ListProps) => {
  const { manager } = useManagerContext();
  const { logoutSAP } = useContext(UserContext);

  return (
    <StyledMenu className={`menu ${menuClass}`} ref={dropdownRef}>
      <ul id="sections">
        <StyledList onClick={toggleDropdown}>
          <div>
            <ListTitle
              toggleSection={() => toggleSection("compras")}
              text="Compras"
              isActive={activeSection === "compras"}
            />
            <PurchaseList
              activeSection={activeSection}
              listActive={listActive}
            />
          </div>
          {manager && (
            <div>
              <ListTitle
                toggleSection={() => toggleSection("aprovacao")}
                text="Aprovação"
                isActive={activeSection === "aprovacao"}
              />
              <ApproverList
                activeSection={activeSection}
                listActive={listActive}
              />
            </div>
          )}
        </StyledList>
        <a onClick={() => logoutSAP()}>Alterar base</a>
      </ul>
    </StyledMenu>
  );
};
