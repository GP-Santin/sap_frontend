import { styled } from "styled-components";

export const InputStyled = styled.input`
  width: 100%;
  height: 3rem;

  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;

  padding: 1rem;

  outline: none;

  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-1);
  font-size: var(--font-size-1);

  color: var(--color-black-text);
`;

export const ContainerInputSyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;
