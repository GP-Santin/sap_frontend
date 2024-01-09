import styled from "styled-components";
import DatePicker from "react-datepicker";

export const StyledContainerData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
`;
