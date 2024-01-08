import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 100%;

  button {
    padding: 1rem;
  }
`;

export const StyledContainerPurchaseFields = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StyledErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    color: var(--color-alert);
  }
`;

export const StyledContainerLineItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
