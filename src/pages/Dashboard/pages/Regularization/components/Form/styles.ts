import { FaRegTrashAlt } from "react-icons/fa";
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

export const StyledIcon = styled(FaRegTrashAlt)`
  cursor: pointer;
  transform: translateY(100);
  transition: all 0.5s;
  &:hover {
    color: var(--color-denim);

    transition: all 0.5s;

    transform: translateY(-5%);
  }
`;
