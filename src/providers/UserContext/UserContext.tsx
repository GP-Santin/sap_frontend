import { createContext } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { apiSantin } from "../../services/api";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const apiLogin = async () => {
    try {
      const response = await apiSantin.post("/auth", {
        user: import.meta.env.VITE_API_LOGIN,
        password: import.meta.env.VITE_API_PASSWORD,
      });
      localStorage.setItem("@santinAPI", response.data.token);
    } catch (error: AxiosError | any) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
