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
  background-color: ${(props) => props.theme.colors.primarysoft};
  color: ${(props) => props.theme.colors.primarytint};

  top: 105%;
  z-index: 999;
  overflow-x: hidden;
  border-radius: 8px;
  border: 1px solid var(--color-gray);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primarytint};
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
    color: ${(props) => props.theme.colors.primarysoft};
    background-color: ${(props) => props.theme.colors.primarytint};
  }
`;
