import styled from "styled-components";
import DatePicker from "react-datepicker";

export const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
`;

export const StyledDatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    color: ${(props) => props.theme.colors.primarytint};
  }
`;
