export interface IProject {
  Code: string;
  Name: string;
  ValidFrom: Date;
}

export interface IProjectProps {
  setProject: React.Dispatch<React.SetStateAction<string>>;
  project: string;
  managementCode: string;
}
