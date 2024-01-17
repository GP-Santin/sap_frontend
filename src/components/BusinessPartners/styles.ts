import styled from "styled-components";

export const StyledBusinessPartnersContainer = styled.div`
  position: relative;
`;

export const StyledBusinessPartnersDropdown = styled.div`
  height: 15rem;
  overflow-y: auto;
  cursor: pointer;
  position: absolute;

  z-index: 999;
  top: 105%;
  overflow-x: hidden;
  border: 1px solid var(--color-gray);
  border-radius: 0.5rem;
  width: 30rem;
  background-color: ${(props) => props.theme.colors.primarysoft};
  color: ${(props) => props.theme.colors.primarytint};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primarytint};
  }

  @media (max-width: 1300px) {
    width: 50vw;
    top: 14%;
  }

  li {
    padding: 0.5rem 0 0.25rem 0.5rem;
    height: 3.5rem;
  }

  li:hover {
    color: ${(props) => props.theme.colors.primarysoft};
    background-color: ${(props) => props.theme.colors.primarytint};
  }
`;
