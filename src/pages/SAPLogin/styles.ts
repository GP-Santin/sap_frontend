import styled from "styled-components";

export const StyledSAPLogin = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
`;
