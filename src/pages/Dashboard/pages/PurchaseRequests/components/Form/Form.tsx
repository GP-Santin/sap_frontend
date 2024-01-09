import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { purchaseFormSchema } from "../FormRequest/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectItem from "../../../../../../components/SelectItem/SelectItems";
import { useState } from "react";

function Form() {
  const methods = useForm({ resolver: zodResolver(purchaseFormSchema) });
  const [items, setItems] = useState<
    { ItemCode: string; ItemDescription: string }[]
  >([]);

  const onSubmit: SubmitHandler<any> = (formData) => {
    const formattedData: any = {
      RequriedDate: formData.RequriedDate,
      // DocumentLines: items,
    };
    console.log(formData);
    // console.log(formattedData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DatePickerComponent />
        <SelectItem setItems={setItems} />
        <button style={{ width: "100%", backgroundColor: "red" }}>
          Submit
        </button>
      </form>
    </FormProvider>
  );
}

export default Form;
