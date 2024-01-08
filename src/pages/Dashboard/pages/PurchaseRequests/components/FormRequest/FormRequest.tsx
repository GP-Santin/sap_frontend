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
import Projects from "../../../../../../components/Projects/Projects";

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

  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);

  const submit: SubmitHandler<TPurchase> = (formData) => {
    console.log(formData);
    reset();
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
        <Projects register={register} errors={errors} />
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
            {...register("Comments")}
          />
        </StyledErrorContainer>
      </div>
      <Button
        widthsize="med2"
        color="outline-black"
        name="Adicionar solicitação"
        type="submit"
        style={{ marginTop: "1rem" }}
        onClick={() => console.log("submit")}
      />
    </StyledForm>
  );
}

export default FormRequest;
