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
  height: 15rem;
  overflow-y: scroll;
  cursor: pointer;
  position: absolute;
  z-index: 999;
  top: 105%;
  overflow-x: hidden;
  border: 1px solid var(--color-gray);
  border-radius: 0.5rem;

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

  li {
    padding: 0.25rem;
    height: 2.5rem;
  }

  li:hover {
    color: var(--color-gray);
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
