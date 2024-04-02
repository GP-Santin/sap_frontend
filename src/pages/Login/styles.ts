import styled from "styled-components";

export const StyledLogin = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primarytint};
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    position: absolute;
    top: 1rem;
    right: 2rem;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  color: ${(props) => props.theme.colors.primarytint};
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
