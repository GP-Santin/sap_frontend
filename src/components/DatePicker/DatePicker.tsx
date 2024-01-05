import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseFormSetValue } from "react-hook-form";
import ptBr from "date-fns/locale/pt-BR";
import { Input } from "../Input/Input";
import { StyledContainerData } from "./styles";
import { format } from "date-fns";

interface DatePickerProps {
  setValue: UseFormSetValue<any>;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({ setValue }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    const dateFormatted = format(date, "dd-MM-yyyy");
    setStartDate(date);

    setValue("datanecessaria", dateFormatted, { shouldValidate: true });
  };

  return (
    <StyledContainerData>
      <span>Data necessária</span>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        locale={ptBr}
        customInput={<Input widthsize="med2" />}
        
      />
    </StyledContainerData>
  );
};

export default DatePickerComponent;
