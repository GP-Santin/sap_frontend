import { useFormContext } from "react-hook-form";
import ptBr from "date-fns/locale/pt-BR";
import { Input } from "../Input/Input";
import { format } from "date-fns";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/Form/styles";
import { StyledDatePicker } from "./styles";

function DatePickerComponent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { register } = useFormContext();
  const {
    formState: { errors },
  } = useFormContext();

  const handleDateChange = (date: Date) => {
    const dateFormatted = format(date, "yyyy-MM-dd");
    setStartDate(date);
    register("RequriedDate", { value: dateFormatted });
  };

  return (
    <StyledErrorContainer>
      <p>Data da necessidade</p>
      <StyledDatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        locale={ptBr}
        customInput={
          <Input $widthsize="large3" style={{ maxWidth: "12rem" }} />
        }
      />
      {errors && errors.RequriedDate && (
        <span>{String(errors.RequriedDate.message)}</span>
      )}
    </StyledErrorContainer>
  );
}

export default DatePickerComponent;
