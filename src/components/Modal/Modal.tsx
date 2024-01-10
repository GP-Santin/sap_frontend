import React from "react";
import { StyledModal } from "./styles";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  content,
}) => {
  return (
    <StyledModal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <h3>Solicitação realizada com sucesso !</h3>
        {content}
      </div>
    </StyledModal>
  );
};

export default ModalComponent;
