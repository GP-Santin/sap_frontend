import styled from "styled-components";

export const StyledBusinessPartnersContainer = styled.div`
  position: relative;
`;

export const StyledBusinessPartnersDropdown = styled.div`
  height: 15rem;
  overflow-y: auto;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.buttonBackground};
  color: ${(props) => props.theme.colors.text};
  z-index: 999;
  top: 100%;
  overflow-x: hidden;
  border-bottom-left-radius: 8px;
  width: 25rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1300px) {
    width: 50vw;
    top: 14%;
  }

  li {
    padding-left: 0.25rem;
    height: 3.5rem;
  }

  li:hover {
    background-color: var(--color-black-2);
  }
`;
