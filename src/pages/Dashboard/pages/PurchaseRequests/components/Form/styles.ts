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

export const StyledContainerFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledTableContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 80%;
  border-collapse: collapse;

  tr {
    text-align: start;
    border: 1px solid var(--color-primary);
    border-bottom: 1px solid var(--primary-color);
  }

  td {
    border: 1px solid var(--color-primary);
    padding: 0.5rem;
  }
`;

export const StyledErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;

  span {
    color: var(--color-alert);
  }
`;

export const StyledItemsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  
`;
