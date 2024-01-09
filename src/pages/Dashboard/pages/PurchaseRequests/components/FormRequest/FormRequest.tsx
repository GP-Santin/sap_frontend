import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../../../components/Input/Input";
import {
  StyledContainerLineItems,
  StyledContainerPurchaseFields,
  StyledErrorContainer,
  StyledForm,
} from "./style";
import { IPurchaseRequest, purchaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../../components/Button/Button";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useState } from "react";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import { DocumentLineField } from "./@types";
import { IItem } from "../../../../../../providers/AppContext/@types";
import LineItems from "../../../../../../components/LineItems/LineItems";

function FormRequest() {
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPurchaseRequest>({
    resolver: zodResolver(purchaseFormSchema),
  });
  const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
  const [listItems, setListItems] = useState<DocumentLineField[]>([]);
  const { createPurchaseRequest } = useContext(UserContext);

  const submit: SubmitHandler<IPurchaseRequest> = (formData) => {
    const formattedData: any = {
      RequiredDate: formData.RequriedDate,
      DocumentLines: listItems.map((item) => ({
        ItemCode: item.ItemCode,
        ItemDescription: item.ItemDescription,
        Quantity: item.Quantity,
        U_SNT_Finalidade: item.U_SNT_Finalidade,
        CostingCode2: item.CostingCode2,
        CostingCode: item.CostingCode,
        ProjectCode: item.ProjectCode,
      })),
      U_SNT_Suprimento: "SIM",
      U_SNT_SC_Manut: "S",
    };

    createPurchaseRequest(formattedData);

    reset();
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <StyledForm onSubmit={handleSubmit(submit, onInvalid)}>
      <StyledContainerPurchaseFields>
        <StyledErrorContainer>
          <DatePickerComponent setValue={setValue} />
        </StyledErrorContainer>
        <Input
          widthsize="small"
          type="text"
          label="Solicitante"
          {...register("U_SNT_Requester")}
        />
      </StyledContainerPurchaseFields>
      <StyledContainerLineItems>
        <LineItems
          setValue={setValue}
          listItems={listItems}
          setListItems={setListItems}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          errors={errors}
          register={register}
        />
      </StyledContainerLineItems>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <h2>Itens selecionados</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Item</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Descrição</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) => (
              <tr key={item.LineNum} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{item.ItemCode}</td>
                <td style={{ padding: "8px" }}>{item.ItemDescription}</td>
                <td style={{ padding: "8px" }}>{item.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      />
    </StyledForm>
  );
}

export default FormRequest;
