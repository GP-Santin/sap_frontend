import { FaAngleDown } from "react-icons/fa";
import { StyledListTitle } from "src/components/NavBar/styles";

type ListTitleProps = {
  text: string;
  toggleSection: () => void;
  isActive: boolean;
};
export const ListTitle = ({
  text,
  toggleSection,
  isActive,
}: ListTitleProps) => {
  return (
    <StyledListTitle onClick={toggleSection}>
      {text}
      <FaAngleDown
        style={{
          transform: isActive ? "rotate(0deg)" : "rotate(180deg)",
          transition: "all ease-out 0.4s",
        }}
      />
    </StyledListTitle>
  );
};
