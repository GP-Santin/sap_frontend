import { useOutsideClick } from "../../hooks/outsideClick";
import { IProject } from "./@types";
import { StyledProjectDropdown } from "./styles";

interface IDropdownProps {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setProject: React.Dispatch<React.SetStateAction<string>>;
  filteredProjects: IProject[];
}

function Dropdown({
  setOpenDropdown,
  setProject,
  filteredProjects,
}: IDropdownProps) {
  const handleProjectClick = (selectedProjectCode: string) => {
    setProject(selectedProjectCode);
    setOpenDropdown(false);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };

  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  return (
    <StyledProjectDropdown ref={dropdownRef}>
      <ul>
        {filteredProjects.map((project: IProject, index: number) => (
          <li key={index} onClick={() => handleProjectClick(project.Code)}>
            {project.Code} - {project.Name}
          </li>
        ))}
      </ul>
    </StyledProjectDropdown>
  );
}

export default Dropdown;
