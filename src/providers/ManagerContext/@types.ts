export interface IManagerProviderProps {
  children: React.ReactNode;
}

export interface IManagerContext {
  manager: boolean;
  setManager: React.Dispatch<React.SetStateAction<boolean>>;
}
