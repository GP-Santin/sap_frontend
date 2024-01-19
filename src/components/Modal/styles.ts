import Modal from "react-modal";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primarytint};
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  height: 60%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5rem;
  }

  span {
    display: flex;
    gap: 1rem;
    border: 1px solid var(--color-primary);
    border-radius: 2rem;
    padding: 1rem;
    cursor: pointer;

    &:hover {
      background-color: var(--color-primary);
      transition: all 0.5s;
    }
  }

  div.modal-content {
    display: flex;
    flex-direction: column;
    gap: 5rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }
`;
