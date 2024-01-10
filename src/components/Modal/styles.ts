import Modal from "react-modal";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  width: 80%;
  max-width: 600px;
  height: 60%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  div.modal-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5;
      text-align: center;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.text};
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${(props) => props.theme.colors.background};
      }
    }
  }
`;
