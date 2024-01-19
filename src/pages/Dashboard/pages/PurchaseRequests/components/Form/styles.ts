import styled from "styled-components";
import { IconType } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa";

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

export const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-collapse: collapse;
  overflow: hidden;
  width: 100%;

  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;

export const StyledItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    color: ${(props) => props.theme.colors.primarytint};
  }
`;

export const StyledItemContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primarytint};
  width: 100%;
  flex-direction: column;

  @media (min-width: 768px) {
    align-items: flex-start;
    flex-direction: row;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: auto;
  width: 100%;

  h4 {
    color: var(--color-white);
    width: 100%;
    background-color: var(--color-primary);
    padding: 1rem;
    text-align: center;
  }

  p {
    font-size: x-small;
  }

  @media (min-width: 768px) {
    p {
      font-size: medium;
    }
  }
`;

export const StyledTable = styled.div`
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;

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

export const StyledRadioContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

export const StyledTrashContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  .icon {
    cursor: pointer;
    transform: translateY(0%);
    transition: all 0.25s;

    &:hover {
      transform: translateY(-10%);
      color: var(--color-denim);
      transition: all 0.25s;
    }
  }

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const StyledMinus: IconType = styled(FaMinus)`
  cursor: pointer;

  &:hover {
    color: var(--color-denim);
    transition: all 0.25s;
  }
`;

export const StyledPlus: IconType = styled(FaPlus)`
  cursor: pointer;

  &:hover {
    color: var(--color-denim);
    transition: all 0.25s;
  }
`;

export const StyledTextArea = styled.textarea`
  max-width: 64rem;
  min-height: 3rem;
  margin-top: -1rem;

  border: 2px solid var(--color-primary);
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
