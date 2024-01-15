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
  top: 5%;
  width: 20%;
  height: auto;

  border-right: 1px solid ${(props) => props.theme.colors.buttonBackground};

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

  transition: all 0.2s cubic-bezier(0.7, 0, 0.3, 1);
`;

export const StyledListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: var(--color-primary);
    transition: all 0.5s;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
  top: 0.75rem;
  right: 1rem;
`;
