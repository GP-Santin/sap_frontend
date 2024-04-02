import { useFormContext } from "react-hook-form";
import ptBr from "date-fns/locale/pt-BR";
import { Input } from "../Input/Input";
import { format } from "date-fns";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { StyledDatePicker } from "./styles";
import { StyledDatePickerContainer } from "./styles";

interface IDatePickerProps {
  setRegister: string;
  label: string;
}

function DatePickerComponent({ setRegister, label }: IDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { register } = useFormContext();

  const handleDateChange = (date: Date) => {
    const dateFormatted = format(date, "yyyy-MM-dd");
    setStartDate(date);
    register(setRegister, { value: dateFormatted });
  };

  return (
    <StyledDatePickerContainer>
      <p>{label}</p>
      <StyledDatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        locale={ptBr}
        customInput={<Input widthsize="large3" style={{ maxWidth: "12rem" }} />}
      />
    </StyledDatePickerContainer>
  );
}

export default DatePickerComponent;
