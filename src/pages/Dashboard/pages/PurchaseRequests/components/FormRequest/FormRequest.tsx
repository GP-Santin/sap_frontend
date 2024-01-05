import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../../../components/Input/Input";
import { StyledContainerPurchaseFields, StyledForm } from "./style";
import { TPurchase, purchaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../../components/Button/Button";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";

function FormRequest() {
  const businessPartnersString = localStorage.getItem("@businesspartners");
  const businessPartners = businessPartnersString
    ? JSON.parse(businessPartnersString)
    : [];
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPurchase>({
    resolver: zodResolver(purchaseFormSchema),
  });
  const { newPurchaseNumber } = useContext(UserContext);

  const submit: SubmitHandler<TPurchase> = async (formData) => {
    console.log(formData);
    reset();
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledContainerPurchaseFields>
          <Input widthsize="med2" label="Data necessária" type="text" />
        </StyledContainerPurchaseFields>
        {/* <Input
            widthsize="small"
            type="text"
            value="DTI006"
            label="Solicitante"
            disabled={true}
            {...register("solicitante")}
          /> */}
        <div>
          <Input
            label="Número"
            widthsize="small"
            value={newPurchaseNumber}
            disabled={true}
          />
        </div>
      </StyledForm>
      <Button
        color="outline-black"
        name="Adicionar pedido"
        widthsize="med2"
        type="submit"
      />
    </>
  );
}

export default FormRequest;
