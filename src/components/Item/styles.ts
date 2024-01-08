import styled from "styled-components";

export const StyledItemContainer = styled.div`
  display: flex;
  position: relative;
  gap: 1rem;

  @media (min-width: 768px) {
    #itemDescription {
      width: 20rem;
    }
  }
`;

export const StyledDropdown = styled.div`
  height: 10rem;
  overflow-y: scroll;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  top: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
