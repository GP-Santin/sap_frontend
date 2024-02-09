import { createContext, useContext, useState } from "react";
import { IManagerContext, IManagerProviderProps } from "./@types";

export const ManagerContext = createContext({} as IManagerContext);

export const ManagerProvider = ({ children }: IManagerProviderProps) => {
  const [manager, setManager] = useState(false);

  return (
    <ManagerContext.Provider value={{ manager, setManager }}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManagerContext = () => useContext(ManagerContext);
