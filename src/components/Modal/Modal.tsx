import React from "react";
import { StyledModal } from "./styles";
import { MdContentCopy } from "react-icons/md";
import { useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: string;
}

async function useClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Texto copiado para a área de transferência");
  } catch (err) {
    console.log("Falha ao copiar o texto", err);
  }
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  content,
}) => {
  const handleCopyClick = useCallback(() => {
    useClipboard(content);
  }, [content]);
  return (
    <StyledModal isOpen={isOpen} onRequestClose={closeModal}>
      <div className="container">
        <h3>Solicitação realizada com sucesso !</h3>
        <h4>Nº da solicitação : {content}</h4>
        <span onClick={handleCopyClick}>
          Copiar código do pedido
          <MdContentCopy />
        </span>
      </div>
    </StyledModal>
  );
};

export default ModalComponent;
