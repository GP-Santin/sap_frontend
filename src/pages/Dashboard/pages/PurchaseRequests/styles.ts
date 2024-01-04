import styled from "styled-components";

export const PurchaseContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 3em);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem 2rem;
`;
