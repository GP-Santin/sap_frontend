import styled from "styled-components";

export const BurguerStyled = styled.div`
  background-color: ${(props) => props.theme.colors.primarytint};
`;

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.primarysoft};
  position: relative;

  h3 {
    color: ${(props) => props.theme.colors.primarytint};
  }

  @media (max-width: 768px) {
    h3 {
      font-size: small;
    }
  }
`;

export const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const StyledMenu = styled.div`
  top: 5%;
  width: clamp(100%, 25%, 30%);
  gap: 1rem;
  justify-content: center;
  height: 95%;

  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primarytint};

  border: 1px solid ${(props) => props.theme.colors.primarysoft};
  border-radius: 0.5rem;

  @media screen and (min-width: 768px) {
    width: 20%;
    justify-content: flex-start;
  }
`;

export const StyledList = styled.li`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  transition: all 0.2s cubic-bezier(0.7, 0, 0.3, 1);
`;

export const StyledListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: var(--color-denim);
    transition: all 0.5s;
  }
`;

export const StyledBackdrop = styled.div`
  /* width: 100%;
  height: 94%;
  position: absolute;
  z-index: 99;

  background-color: rgba(0, 0, 0, 0.3); */
`;

export const Icon = styled.img`
  cursor: pointer;
  top: 0.75rem;
  right: 1rem;
`;

export const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    margin-left: 1rem;
  }

  li:hover {
    color: var(--color-denim);
    transition: all 0.25s;
  }

  a {
    margin-left: 0.5rem;
  }
`;
