import styled from "styled-components";

export const RegularizationContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
