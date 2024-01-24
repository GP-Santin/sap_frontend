import { FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

export const StyledLineItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 1rem;
`;

export const StyledTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      color: ${(props) => props.theme.colors.primarytint};
    }

    p {
      color: ${(props) => props.theme.colors.primarytint};
    }
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
