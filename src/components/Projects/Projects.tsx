import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/style";
import { Input } from "../Input/Input";
import { FieldErrors, UseFormSetValue, useForm } from "react-hook-form";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";
import { StyledDropdown } from "../SelectItem/styles";
import { useEffect, useRef, useState } from "react";
import { IProject } from "./@types";

export interface IProjectsProps {
  errors: FieldErrors<IPurchaseRequest>;
  project: string;
  setProject: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<IPurchaseRequest>;
}

function Projects({ errors, project, setProject, setValue }: IProjectsProps) {
  const { getValues } = useForm();
  const ref = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const projectsList = JSON.parse(localStorage.getItem("@projects") || "[]");

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleProjectClick = (selectedProjectCode: string, index: number) => {
    setProject(selectedProjectCode);
    const updatedDocumentLines = [...getValues("DocumentLines")];
    updatedDocumentLines[index] = {
      ...updatedDocumentLines[index],
      ProjectCode: selectedProjectCode,
    };
    setValue("DocumentLines", updatedDocumentLines);
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
        onClick={handleOpenDropdown}
        value={project}
        style={{ cursor: "pointer" }}
      />
      {errors.DocumentLines && errors.DocumentLines![0]?.ProjectCode ? (
        <span>{errors.DocumentLines![0]?.ProjectCode.message}</span>
      ) : null}
      {openDropdown && (
        <StyledDropdown ref={ref} style={{ width: "30rem" }}>
          <ul>
            {projectsList.map((project: IProject, index: number) => (
              <li
                key={index}
                onClick={() => handleProjectClick(project.Code, index)}
              >
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
