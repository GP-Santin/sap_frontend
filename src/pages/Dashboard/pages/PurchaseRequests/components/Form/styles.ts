import styled from "styled-components";
import { IconType } from "react-icons";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import TableContainer from "@mui/material/TableContainer";

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

  h3 {
    color: ${(props) => props.theme.colors.primarytint};
  }
`;

export const StyledItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    color: ${(props) => props.theme.colors.primarytint};
  }
`;

export const StyledIcon = styled(FaTrashAlt)`
  cursor: pointer;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.primarytint};
  transform: translateY(0);
  transition: all 0.2s;

  &:hover {
    color: var(--color-denim);
    transform: translateY(-10%);
    transition: all 0.2s;
  }
`;

export const StyledMinus: IconType = styled(FaMinus)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primarytint};
  &:hover {
    color: var(--color-denim);
  }
`;

export const StyledPlus: IconType = styled(FaPlus)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primarytint};

  &:hover {
    color: var(--color-denim);
    transition: all 0.25s;
  }
`;

export const StyledTextArea = styled.textarea`
  max-width: 64rem;
  min-height: 3rem;
  margin-top: -1rem;

  border: 1px solid var(--color-primary);
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primarytint};
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

export const StyledTitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  h3 {
    color: ${(props) => props.theme.colors.primarytint};
  }
`;
