import { createContext, useEffect, useState } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { apiSantin } from "../../services/api";
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
    
  }

  useEffect(() => {
    apiLogin();
    console.log(accounts)
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
