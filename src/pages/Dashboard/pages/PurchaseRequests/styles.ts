import styled from "styled-components";

export const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 3em);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem 5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  h2 {
    color: ${(props) => props.theme.colors.primarytint};
  }
`;
