import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../../../components/Input/Input";
import {
  StyledContainerLineItems,
  StyledContainerPurchaseFields,
  StyledErrorContainer,
  StyledForm,
} from "./style";
import { TPurchase, purchaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../../components/Button/Button";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useState } from "react";
import { IItem } from "../../../../../../providers/AppContext/@types";
import Item from "../../../../../../components/Item/Item";

function FormRequest() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TPurchase>({
    resolver: zodResolver(purchaseFormSchema),
  });

  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

  const submit: SubmitHandler<TPurchase> = async (formData: TPurchase) => {
    const { U_SNT_Requester, Quantity } = formData;

    const documentLines = [
      {
        U_SNT_Requester: U_SNT_Requester,
        ItemCode: formData.ItemCode,
        ItemDescription: formData.ItemDescription,
        Quantity: Quantity,
        U_SNT_Finalidade: "1",
        CostingCode2: formData.CostingCode2,
        CostingCode: formData.CostingCode,
        ProjectCode: formData.ProjectCode,
      },
    ];

    const formattedData = {
      RequriedDate: formData.RequriedDate,
      DocumentLines: documentLines,
      U_SNT_Suprimento: "SIM",
      U_SNT_SC_Manut: "S",
    };

    console.log(formattedData);
  };
  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <StyledContainerPurchaseFields>
        <StyledErrorContainer>
          <DatePickerComponent setValue={setValue} />
        </StyledErrorContainer>
        <Input
          widthsize="small"
          type="text"
          value="DTI006"
          label="Solicitante"
          disabled={true}
          {...register("U_SNT_Requester")}
        />
      </StyledContainerPurchaseFields>
      <StyledContainerLineItems>
        <Item
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          errors={errors}
          setValue={setValue}
        />
        <StyledErrorContainer>
          <Input
            label="Quantidade"
            widthsize="small"
            {...register("Quantity")}
          />
          {errors.Quantity ? <span>{errors.Quantity.message}</span> : null}
        </StyledErrorContainer>
        <StyledErrorContainer>
          <Input
            label="Corporativo"
            widthsize="small2"
            {...register("CostingCode2")}
          />
          {errors.CostingCode2 ? (
            <span>{errors.CostingCode2.message}</span>
          ) : null}
        </StyledErrorContainer>
        <StyledErrorContainer>
          <Input
            label="Gerencial"
            widthsize="small2"
            {...register("CostingCode")}
          />
          {errors.CostingCode ? (
            <span>{errors.CostingCode.message}</span>
          ) : null}
        </StyledErrorContainer>
        <StyledErrorContainer>
          <Input
            label="Projeto"
            widthsize="small2"
            {...register("ProjectCode")}
          />
          {errors.ProjectCode ? (
            <span>{errors.ProjectCode.message}</span>
          ) : null}
        </StyledErrorContainer>
        <Button
          widthsize="med2"
          color="outline-black"
          name="Adicionar item"
          type="submit"
          style={{ marginTop: "1rem" }}
        />
      </StyledContainerLineItems>
      <div>
        <StyledErrorContainer>
          <Input
            label="Observações"
            widthsize="large3"
            style={{
              height: "10rem",
              resize: "none",
            }}
          />
        </StyledErrorContainer>
      </div>
    </StyledForm>
  );
}

export default FormRequest;
