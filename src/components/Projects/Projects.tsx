import { Input } from "../Input/Input";
import { useEffect, useState } from "react";
import { IProject, IProjectProps } from "./@types";
import { useOutsideClick } from "../../hooks/outsideClick";
import { StyledProjectDropdown, StyledProjectsContainer } from "./styles";

function Projects({ project, setProject, managementCode }: IProjectProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [handleFiltered, setHandleFiltered] = useState<string>("");
  const [, setInputValue] = useState<string>("");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleFilterProjects = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHandleFiltered(value);
    setInputValue(value);
    const filtered = filterProjects(value);
    setFilteredProjects(filtered);
  };

  const handleProjectClick = (selectedProjectCode: string) => {
    setProject(selectedProjectCode);
    setInputValue(selectedProjectCode);
    setOpenDropdown(false);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  const filterProjects = (inputValue: string): IProject[] => {
    const projectsList = JSON.parse(sessionStorage.getItem("@projects") || "[]");

    const filteredProjects = projectsList.filter((project: IProject) => {
      const projectManagementCodePrefix = project.Code.substring(0, 2);
      return (
        projectManagementCodePrefix === managementCode ||
        projectManagementCodePrefix === "99"
      );
    });

    const filtered = filteredProjects.filter((project: IProject) => {
      return (
        project.Code.toLowerCase().includes(inputValue.toLowerCase()) ||
        project.Name.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
    return filtered;
  };

  useEffect(() => {
    const filtered = filterProjects(handleFiltered);
    setFilteredProjects(filtered);
  }, [managementCode, handleFiltered]);

  return (
    <StyledProjectsContainer>
      <Input
        label="Projeto"
        widthsize="small2"
        onClick={handleOpenDropdown}
        value={project}
        style={{ cursor: "pointer" }}
        onChange={handleFilterProjects}
      />
      {openDropdown && (
        <StyledProjectDropdown ref={dropdownRef}>
          <ul>
            {filteredProjects.map((project: IProject, index: number) => (
              <li key={index} onClick={() => handleProjectClick(project.Code)}>
                {project.Code} - {project.Name}
              </li>
            ))}
          </ul>
        </StyledProjectDropdown>
      )}
    </StyledProjectsContainer>
  );
}

export default Projects;
