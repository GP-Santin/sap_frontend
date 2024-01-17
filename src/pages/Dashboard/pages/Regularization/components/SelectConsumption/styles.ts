import styled from "styled-components";

export const StyledConsumptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    #itemDescription {
      width: 20rem;
    }
  }
`;

export const StyledConsumptionDropdown = styled.div`
  width: 100%;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.primarysoft};
  color: ${(props) => props.theme.colors.primarytint};
  top: 105%;
  z-index: 999;
  overflow-x: hidden;
  border: 1px solid var(--color-gray);
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primarysoft};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 768px) {
    width: 50vw;
  }

  li {
    padding: 0.2rem 0.5rem;
  }

  li:hover {
    background-color: ${(props) => props.theme.colors.primarysoft};
  }
`;
