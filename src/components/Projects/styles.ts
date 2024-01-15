import styled from "styled-components";

export const StyledProjectsContainer = styled.div`
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

export const StyledLineProjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const StyledProjectDropdown = styled.div`
  width: 100%;
  height: 10rem;
  cursor: pointer;
  position: absolute;
  background-color: ${(props) => props.theme.colors.buttonBackground};
  color: ${(props) => props.theme.colors.text};
  top: 100%;
  z-index: 999;
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

  @media (max-width: 768px) {
    width: 50vw;
  }

  li {
    padding: 0.25rem;
  }

  li:hover {
    background-color: var(--color-border);
  }
`;
