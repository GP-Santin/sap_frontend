import styled from "styled-components";
import { IconType } from "react-icons";
import { FaRegTrashAlt } from "react-icons/fa";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;

  thead {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  th {
    padding-right: 1.5rem;
    padding: 0.5rem;
  }

  td {
    padding: 0.5rem;
    text-align: center;
  }

  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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

export const StyledRadioContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

export const StyledTrashIcon = styled(FaRegTrashAlt)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  width: 20px;
  height: 20px;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    transition: all 0.25s;
  }
`;
