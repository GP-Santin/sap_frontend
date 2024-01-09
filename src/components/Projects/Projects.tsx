import { Input } from "../Input/Input";
import { UseFormReturn, useForm } from "react-hook-form";
import { StyledDropdown } from "../SelectItem/styles";
import { useRef, useState } from "react";
import { IProject, IProjectProps } from "./@types";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/styles";

function Projects({ setProject, project }: IProjectProps) {
  const { getValues }: UseFormReturn = useForm();
  const ref = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const projectsList = JSON.parse(localStorage.getItem("@projects") || "[]");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleProjectClick = (selectedProjectCode: string) => {
    setProject(selectedProjectCode);

    setOpenDropdown(false);
  };

  return (
    <StyledErrorContainer>
      <Input
        label="Projeto"
        widthsize="small2"
        onClick={handleOpenDropdown}
        value={project}
        style={{ cursor: "pointer" }}
      />
      {openDropdown && (
        <StyledDropdown ref={ref} style={{ width: "30rem" }}>
          <ul>
            {projectsList.map((project: IProject, index: number) => (
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
