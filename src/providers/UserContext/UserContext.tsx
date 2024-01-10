import { createContext, useEffect, useState } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";
import ModalComponent from "../../components/Modal/Modal";
import apiSAP from "../../middleware/handleRequest.middleware";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [shouldReload, setShouldReload] = useState(false);

  const createPurchaseRequest = async (formData: IPurchaseRequest) => {
    try {
      const { data } = await apiSAP.post("/PurchaseRequests", formData);
      localStorage.setItem("@savedItems", JSON.stringify([]));
      setModalContent(`Nº da solicitação: ${data.DocNum}`);
      setIsModalOpen(true);
      localStorage.setItem("@savedItems", "");
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getActiveUserSAP = async (email: string) => {
    try {
      const { data } = await apiSAP.get(
        `/EmployeesInfo?$filter = eMail eq '${email}'`
      );
      localStorage.setItem("@owner", JSON.stringify(data.value[0].EmployeeID));
    } catch (error) {
      console.error("Erro ao consultar empregado:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldReload(true);
  };

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  return (
    <UserContext.Provider
      value={{ createPurchaseRequest, getActiveUserSAP }}
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
