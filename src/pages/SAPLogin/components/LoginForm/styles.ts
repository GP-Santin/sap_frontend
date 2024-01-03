import styled from "styled-components";

export const StyledContainerFields = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;

  span {
    color: red;

    font-size: var(--font-size-1);
    font-weight: var(--font-weight-1);
    font-family: var(--font-family-secondary);
  }
`;

export const StyledContainer = styled.div`
  width: clamp(60%, 80vw, 1024px);
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    color: var(--color-text);
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 3rem;

  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;

  padding: 1rem;

  outline: none;

  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-1);
  font-size: var(--font-size-1);

  color: var(--color-text);
  background-color: var(--background-color);
`;
