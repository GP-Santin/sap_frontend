import { createContext, useState } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { apiSAP, apiSantin } from "../../services/api";
import { useMsal } from "@azure/msal-react";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState("");
  const { accounts } = useMsal();


  const apiLogin = async () => {
    try {
      const response = await apiSantin.post("/auth", {
        user: import.meta.env.VITE_API_LOGIN,
        password: import.meta.env.VITE_API_PASSWORD,
      });
      localStorage.setItem("@santinAPI", response.data.token);
      setUser(accounts[0].username);
      setUser(response.data);
    } catch (error: AxiosError | any) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const getActiveUserSAP = async () => {
    try {

      const result = await apiSAP.get(`/EmployeesInfo`);
    } catch (error) {
      console.error("Erro ao consultar empregado:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, getActiveUserSAP, apiLogin }}>
      {children}
    </UserContext.Provider>
  );
};
