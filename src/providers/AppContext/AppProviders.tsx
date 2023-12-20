import { createContext, useContext, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading } from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const { setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<ILoading | boolean>(false);

  const navigate = useNavigate();

  const userLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      const { data } = await api.post("/Login", formData);

      setUser(data);

      toast.success("Login feito com sucesso");

      navigate("/dashboard");
    } catch (error: AxiosError | any) {
      toast.error("Dados incorretos, verifique e tente novamente");
      console.error(error);
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
        userLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
