import { createContext } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";
import { AxiosError } from "axios";
import { apiSAP } from "../../services/api";
import { toast } from "react-toastify";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const createPurchaseRequest = async (formData: IPurchaseRequest) => {
    try {
      const { data } = await apiSAP.post("/PurchaseRequests", formData);

      toast.success(
        `Solicitação criada com sucesso!, Nº da solicitação: ${data.DocEntry}`
      );
    } catch (error: AxiosError | any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider value={{ createPurchaseRequest }}>
      {children}
    </UserContext.Provider>
  );
};
