import { createContext, useContext, useState } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";
import ModalComponent from "../../components/Modal/Modal";
import apiSAP from "../../middleware/handleRequest.middleware";
import { IOrderRequest } from "../../pages/Dashboard/pages/Regularization/components/Form/@types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext/AppProviders";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { setLoading } = useContext(AppContext);

  const navigate = useNavigate();

  const createPurchaseRequest = async (formData: IPurchaseRequest) => {
    try {
      setLoading(true);

      const { data } = await apiSAP.post("/PurchaseRequests", formData);
      localStorage.setItem("@savedItems", JSON.stringify([]));
      setModalContent(`${data.DocNum}`);
      setIsModalOpen(true);
      localStorage.setItem("@savedItems", "");
    } catch (error: AxiosError | any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPurchaseQuotations = async (formData: IOrderRequest) => {
    try {
      setLoading(true);
      const { data } = await apiSAP.post("/PurchaseQuotations", formData);
      setModalContent(`${data.DocNum}`);
      setIsModalOpen(true);
      localStorage.setItem("@savedItems", "");
    } catch (error: AxiosError | any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getActiveUserSAP = async (email: string) => {
    try {
      const { data } = await apiSAP.get(
        `/EmployeesInfo?$filter = eMail eq '${email}'`
      );
      localStorage.setItem(
        "@userbranches",
        JSON.stringify(data.value[0].EmployeeBranchAssignment)
      );
      localStorage.setItem("@owner", JSON.stringify(data.value[0].EmployeeID));
      localStorage.setItem(
        "@salesPersonCode",
        JSON.stringify(data.value[0].SalesPersonCode)
      );
    } catch (error) {
      console.error("Erro ao consultar empregado:", error);
    }
  };

  const logoutSAP = async () => {
    try {
      await apiSAP.post("/Logout");
      localStorage.removeItem("@salespersons");
      localStorage.removeItem("@businesspartners");
      localStorage.removeItem("@session");
      localStorage.removeItem("@owner");
      localStorage.removeItem("@salesPersonCode");
      localStorage.removeItem("@projectmanagements");
      localStorage.removeItem("@base");
      localStorage.removeItem("@savedItems");
      localStorage.removeItem("@usage");
      localStorage.removeItem("@projects");
      localStorage.removeItem("@items");
      localStorage.removeItem("@allbranches");
      localStorage.removeItem("@userbranches");
      localStorage.removeItem("@adiantamento");
      toast.success("Logout efetuado com sucesso");
      navigate("/login");
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        createPurchaseRequest,
        getActiveUserSAP,
        createPurchaseQuotations,
        logoutSAP,
      }}
    >
      {children}
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={modalContent}
      />
    </UserContext.Provider>
  );
};
