import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading } from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { apiSAP } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<ILoading | boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  
  const navigate = useNavigate();

  const appLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      await apiSAP.post("/Login", formData);

      localStorage.setItem("sessionId", true.toString());

      toast.success("Login feito com sucesso");

      navigate("/dashboard");
    } catch (error: AxiosError | any) {
      if (error.response?.status === 401) {
        toast.error("Usuário sem acesso a base solicitada.");
      } else {
        toast.error("Usuário ou senha inválidos.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        loading,
        appLogin,
        group,
        setGroup,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
