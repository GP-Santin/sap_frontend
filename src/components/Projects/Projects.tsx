import { Input } from "../Input/Input";
import { useEffect, useState } from "react";
import { IProject, IProjectProps } from "./@types";
import { useOutsideClick } from "../../hooks/outsideClick";
import { StyledProjectDropdown, StyledProjectsContainer } from "./styles";

function Projects({ setProject, project, managementCode }: IProjectProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleProjectClick = (selectedProjectCode: string) => {
    setProject(selectedProjectCode);

    setOpenDropdown(false);
  };

  const closeDropdown = () => {
    setOpenDropdown(false);
  };
  const dropdownRef = useOutsideClick({ callback: closeDropdown });

  const filterProjects = () => {
    const projectsList = JSON.parse(localStorage.getItem("@projects") || "[]");

    const filteredProjects = projectsList.filter((project: IProject) => {
      const projectManagementCodePrefix = project.Code.substring(0, 2);
      return (
        projectManagementCodePrefix === managementCode ||
        projectManagementCodePrefix === "99"
      );
    });

    setFilteredProjects(filteredProjects);
  };

  useEffect(() => {
    filterProjects();
  }, [managementCode]);

  return (
    <StyledProjectsContainer>
      <Input
        label="Projeto"
        $widthsize="small2"
        onClick={handleOpenDropdown}
        defaultValue={project}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <StyledProjectDropdown ref={dropdownRef}>
          <ul>
            {filteredProjects.map((project: IProject, index: number) => (
              <li key={index} onClick={() => handleProjectClick(project.Code)}>
                {project.Code} | {project.Name}
              </li>
            ))}
          </ul>
        </StyledProjectDropdown>
      )}
    </StyledProjectsContainer>
  );
}

export default Projects;
