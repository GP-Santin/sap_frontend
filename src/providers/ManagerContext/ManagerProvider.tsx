import { createContext, useContext, useEffect, useState } from "react";
import { IManagerContext, IManagerProviderProps } from "./@types";
import { UserContext } from "../UserContext/UserContext";

export const ManagerContext = createContext({} as IManagerContext);

export const ManagerProvider = ({ children }: IManagerProviderProps) => {
  const { user } = useContext(UserContext);
  const [manager, setManager] = useState(false);

  useEffect(() => {
    if (user?.aprovador === true) {
      setManager(true);
    }
  }, [user]);

  return (
    <ManagerContext.Provider value={{ manager, setManager }}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManagerContext = () => useContext(ManagerContext);
