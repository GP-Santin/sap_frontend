import { createContext, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading } from "./@types";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<ILoading | boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
