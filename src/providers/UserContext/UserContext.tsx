import { createContext, useState } from "react";
import { IUserContext, IUserProviderProps } from "./@types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/@types";
import ModalComponent from "../../components/Modal/Modal";
import apiSAP from "../../middleware/handleRequest.middleware";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const createPurchaseRequest = async (formData: IPurchaseRequest) => {
    try {
      const { data } = await apiSAP.post("/PurchaseRequests", formData);
      localStorage.setItem("@savedItems", JSON.stringify([]));
      setModalContent(
        `Solicitação criada com sucesso!, Nº da solicitação: ${data.DocNum}`
      );
      setIsModalOpen(true);
      toast.success(modalContent);
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UserContext.Provider value={{ createPurchaseRequest }}>
      {children}
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={modalContent}
      />
    </UserContext.Provider>
  );
};
