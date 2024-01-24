import { useOutsideClick } from "../../hooks/outsideClick";
import { IUsage } from "../../../src/providers/AppContext/@types";
import { StyledProjectDropdown } from "../Projects/styles";

interface IDropdownProps {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setUsage: React.Dispatch<React.SetStateAction<string>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  openDropdown: boolean;
}

const Dropdown = ({
  setOpenDropdown,
  setUsage,
  setInputValue,
  openDropdown,
}: IDropdownProps) => {
  const listUsage = JSON.parse(localStorage.getItem("@usage")!);

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const handleUsageClick = (selectedUsage: IUsage) => {
    setInputValue(selectedUsage.Usage);
    const formattedId = selectedUsage.ID.toString();
    setUsage(formattedId);
    setOpenDropdown(!openDropdown);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledProjectDropdown ref={dropdownRef}>
      <ul>
        {listUsage.map((usage: IUsage, index: number) => (
          <li key={index} onClick={() => handleUsageClick(usage)}>
            {usage.ID} - {usage.Usage}
          </li>
        ))}
      </ul>
    </StyledProjectDropdown>
  );
};

Dropdown.propTypes = {};

export default Dropdown;
