import { createContext, useState } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { apiSAP, apiSantin } from "../../services/api";
import { useMsal } from "@azure/msal-react";
import { error } from "console";

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

  const getActiveUserSAP = async (email: string) => {
    try {
      const response = await apiSAP.get(
        `/EmployeesInfo?$filter= eMail eq '${email}'`
      );
      console.log(response.data.value[0]);
    } catch (error) {
      console.error("Erro ao consultar empregado:", error);
    }
  };

  const getItems = async () => {
    try {
      const response = await apiSAP.get(`/Items`);
      const items = response.data.value;
      console.log(items);
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getActiveUserSAP, apiLogin, getItems }}
    >
      {children}
    </UserContext.Provider>
  );
};
