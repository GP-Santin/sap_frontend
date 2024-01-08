import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/style";
import { Input } from "../Input/Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TPurchase } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";
import { StyledDropdown } from "../Item/styles";
import { useEffect, useRef, useState } from "react";
import { IProject } from "./@types";

export interface IProjectsProps {
  register: UseFormRegister<TPurchase>;
  errors: FieldErrors<TPurchase>;
}

function Projects({ register, errors }: IProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [project, setProject] = useState("");
  const projectsList = JSON.parse(localStorage.getItem("@projects") || "[]");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleProjectClick = (selectedProjectCode: string) => {
    setProject(selectedProjectCode);
    setOpenDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <StyledErrorContainer>
      <Input
        label="Projeto"
        widthsize="small2"
        {...register("ProjectCode")}
        onClick={handleOpenDropdown}
        value={project}
        style={{ cursor: "pointer" }}
      />
      {errors.ProjectCode ? <span>{errors.ProjectCode.message}</span> : null}
      {openDropdown && (
        <StyledDropdown ref={ref}>
          <ul>
            {projectsList.map((project: IProject, index: number) => (
              <li key={index} onClick={() => handleProjectClick(project.Code)}>
                {project.Code}
              </li>
            ))}
          </ul>
        </StyledDropdown>
      )}
    </StyledErrorContainer>
  );
}

export default Projects;
