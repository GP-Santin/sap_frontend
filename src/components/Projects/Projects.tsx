import { Input } from "../Input/Input";
import { StyledDropdown } from "../SelectItems/styles";
import { useEffect, useState } from "react";
import { IProject, IProjectProps } from "./@types";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/styles";
import { useOutsideClick } from "../../hooks/outsideClick";

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
    <StyledErrorContainer>
      <Input
        label="Projeto"
        $widthsize="small2"
        onClick={handleOpenDropdown}
        defaultValue={project}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <StyledDropdown ref={dropdownRef} style={{ width: "30rem" }}>
          <ul>
            {filteredProjects.map((project: IProject, index: number) => (
              <li key={index} onClick={() => handleProjectClick(project.Code)}>
                {project.Code} | {project.Name}
              </li>
            ))}
          </ul>
        </StyledDropdown>
      )}
    </StyledErrorContainer>
  );
}

export default Projects;
