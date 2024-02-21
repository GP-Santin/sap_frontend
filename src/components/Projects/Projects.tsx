import { Input } from "../Input/Input";
import { useEffect, useState } from "react";
import { IProject, IProjectProps } from "./@types";
import { StyledProjectsContainer } from "./styles";
import Dropdown from "./Dropdown";

function Projects({ project, setProject, managementCode }: IProjectProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [handleFiltered, setHandleFiltered] = useState<string>("");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleFilterProjects = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHandleFiltered(value);
    setProject(value);
    const filtered = filterProjects(value);
    setFilteredProjects(filtered);
  };

  const filterProjects = (inputValue: string): IProject[] => {
    const projectsList = JSON.parse(localStorage.getItem("@projects") || "[]");

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
        <Dropdown
          setProject={setProject}
          setOpenDropdown={setOpenDropdown}
          filteredProjects={filteredProjects}
        />
      )}
    </StyledProjectsContainer>
  );
}

export default Projects;
