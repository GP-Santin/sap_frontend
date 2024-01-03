import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const BurguerStyled = styled.div`
  background-color: ${(props) => props.theme.colors.text};
`;

export const StyledNav = styled.nav`
  background-color: ${(props) => props.theme.colors.background};
`;

export const StyledMenu = styled.div`
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
`;

export const StyledList = styled.li`
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    margin-left: 1rem;
  }
`;

export const StyledListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: var(--color-primary);
    transition: all 0.25s;
  }
`;
