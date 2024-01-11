import styled from "styled-components";

export const StyledBusinessPartnersContainer = styled.div`
  position: relative;
`;

export const StyledBusinessPartnersDropdown = styled.div`
  width: 100%;
  height: 10rem;
  overflow-y: scroll;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.buttonBackground};
  color: ${(props) => props.theme.colors.text};
  z-index: 999;
  top: 100%;
  padding: 0.25rem;
  overflow-x: hidden;
  border-bottom-left-radius: 8px;

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
`;
