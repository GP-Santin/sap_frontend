import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../../../components/Input/Input";
import { StyledContainerPurchaseFields, StyledForm } from "./style";
import { TPurchase, purchaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../../components/Button/Button";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";

function FormRequest() {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TPurchase>({
    resolver: zodResolver(purchaseFormSchema),
  });
  const { newPurchaseNumber } = useContext(UserContext) || {
    newPurchaseNumber: "",
  };

  const submit: SubmitHandler<TPurchase> = async (formData: TPurchase) => {
    console.log(formData);
    reset();
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledContainerPurchaseFields>
          <DatePickerComponent setValue={setValue} />
          {errors.datanecessaria ? (
            <span>{errors.datanecessaria.message}</span>
          ) : null}
        </StyledContainerPurchaseFields>
        <Input
          widthsize="small"
          type="text"
          value="DTI006"
          label="Solicitante"
          disabled={true}
          {...register("solicitante")}
        />
        <div>
          <Input
            label="Número"
            widthsize="small"
            value={newPurchaseNumber}
            disabled={true}
          />
        </div>
      </StyledForm>
      <Button color="outline-black" name="Adicionar pedido" widthsize="med2" />
    </>
  );
}

export default FormRequest;
