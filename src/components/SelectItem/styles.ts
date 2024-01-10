import styled from "styled-components";

export const StyledItemContainer = styled.div`
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

export const StyledLineItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StyledDropdown = styled.div`
  width: 100%;
  height: 10rem;
  overflow-y: scroll;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  top: 100%;
  z-index: 999;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.text};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const StyledButton = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid var(--color-primary);
  border-radius: 8rem;
  height: 3rem;
  margin-top: 1.3rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
    transition: all 0.25s;
  }
`;
