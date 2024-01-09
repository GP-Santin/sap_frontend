import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useState } from "react";
import { IItemRequest, IPurchaseRequest } from "./@types";
import SelectItems from "../../../../../../components/SelectItem/SelectItems";
import {
  StyledContainerFields,
  StyledForm,
  StyledItemsContainer,
  StyledTable,
} from "./styles";
import { Button } from "../../../../../../components/Button/Button";

function Form() {
  const methods = useForm<IPurchaseRequest>({});
  const [items, setItems] = useState<IItemRequest[]>([]);
  const [listItems, setListItems] = useState<IItemRequest[]>([]);
  const [project, setProject] = useState<string>("");

  const onSubmit: SubmitHandler<IPurchaseRequest> = (formData) => {
    const formattedData: IPurchaseRequest = {
      RequriedDate: formData.RequriedDate,
      DocumentLines: items,
    };
    console.log(formattedData);
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <StyledContainerFields>
          <DatePickerComponent />
          <SelectItems
            setItems={setItems}
            listItems={listItems}
            setListItems={setListItems}
            setProject={setProject}
            project={project}
          />
        </StyledContainerFields>
        {items.length > 0 && (
          <StyledItemsContainer>
            <h3>Itens</h3>
            <StyledTable>
              <thead>
                <tr>
                  <th>Código do item</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Projeto</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemDescription}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.ProjectCode}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </StyledItemsContainer>
        )}
        <Button
          type="submit"
          name="Solicitar"
          widthsize="med2"
          color="outline-black"
          style={{ marginTop: "5rem" }}
        />
      </StyledForm>
    </FormProvider>
  );
}

export default Form;
