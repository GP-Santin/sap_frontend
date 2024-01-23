import styled from "styled-components";

export const StyledBranchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;  
`;

export const StyledBranchDropdown = styled.div`
  width: 10%;
  height: 10rem;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.primarysoft};
  color: ${(props) => props.theme.colors.primarytint};

  top: 105%;
  z-index: 999;
  overflow-x: hidden;
  border-radius: 8px;
  border: 1px solid var(--color-gray);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primarytint};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 768px) {
    width: 50vw;
  }

  li {
    padding: 0.25rem;
  }

  li:hover {
    color: ${(props) => props.theme.colors.primarysoft};
    background-color: ${(props) => props.theme.colors.primarytint};
  }
`;
