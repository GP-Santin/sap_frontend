import styled from "styled-components";

export const BurguerStyled = styled.div`
  background-color: ${(props) => props.theme.colors.text};
`;

export const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.buttonBackground};
  position: relative;

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
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  position: absolute;
  top: 5%;
  width: 20%;
  z-index: 1000;
  height: calc(100vh - 2.7em);

  border-right: 2px solid ${(props) => props.theme.colors.buttonBackground};

  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const StyledList = styled.li`
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const StyledListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: var(--color-primary);
    transition: all 0.5s;
  }

  @media screen {
  }
`;

export const Icon = styled.img`
  cursor: pointer;
  top: 0.75rem;
  right: 1rem;
`;

export const StyledLogout = styled.a`
  position: absolute;
  bottom: 2%;
`;
