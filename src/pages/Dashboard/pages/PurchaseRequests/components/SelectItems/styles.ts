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
    transition: all 0.25s;
    color: var(--color-white);
    background-color: var(--color-primary);
  }
`;
