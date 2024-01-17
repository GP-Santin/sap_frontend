import styled from "styled-components";
import { IconType } from "react-icons";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;

  button {
    padding: 1rem;
  }

  label {
    color: ${(props) => props.theme.colors.primarytint};
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
    color: var(--color-primary);
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
  gap: 0.5rem;
  position: relative;

  p {
    color: ${(props) => props.theme.colors.primarytint};
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
  width: 20px;
  height: 20px;

  &:hover {
    transition: all 0.25s;
  }
`;

export const StyledMinus: IconType = styled(FaMinus)`
  cursor: pointer;

  &:hover {
    transition: all 0.25s;
  }
`;

export const StyledPlus: IconType = styled(FaPlus)`
  cursor: pointer;

  &:hover {
    transition: all 0.25s;
  }
`;

export const StyledTextArea = styled.textarea`
  max-width: 64rem;
  min-height: 3rem;

  border: 1px solid ${(props) => props.theme.colors.primarysoft};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;

  padding: 1rem;

  outline: none;

  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-1);
  font-size: var(--font-size-1);

  overflow-wrap: break-word;

  height: 10rem;

  resize: none;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
