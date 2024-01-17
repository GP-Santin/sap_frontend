import styled from "styled-components";

export const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  position: relative;
`;

export const StyledDropdown = styled.div`
  width: 40%;
  height: 10rem;
  overflow-y: scroll;
  cursor: pointer;
  position: absolute;

  z-index: 999;
  top: 100%;
  padding: 0.25rem;
  overflow-x: hidden;
  border-bottom-left-radius: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1300px) {
    width: 50vw;
    top: 14%;
  }
`;

export const StyledItemDropdown = styled.div`
  width: 40%;
  height: 10rem;
  overflow-y: scroll;
  cursor: pointer;
  position: absolute;

  z-index: 999;
  top: 100%;
  padding: 0.25rem;
  overflow-x: hidden;
  border-bottom-left-radius: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1300px) {
    width: 50vw;
    top: 14%;
  }

  ul {
    display: flex;
    gap: 1rem;
  }
`;

export const StyledButton = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 8rem;
  height: 3rem;
  margin-top: 1.3rem;
  color: ${(props) => props.theme.colors.primarytint};

  &:hover {
    transition: all 0.15s;
    color: var(--color-white);
    background-color: var(--color-primary);
  }
`;
