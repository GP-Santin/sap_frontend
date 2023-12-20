import { createContext, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading } from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<ILoading | boolean>(false);

  const navigate = useNavigate();

  const appLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      const { data } = await api.post("/Login", formData);

      console.log(data);

      localStorage.setItem("sessionSAPId", data.SessionId);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
