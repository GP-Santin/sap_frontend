import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
import { IItemRequest, IPurchaseRequest } from "./@types";
import SelectItems from "../../../../../../components/SelectItems/SelectItems";
import {
  StyledContainerFields,
  StyledForm,
  StyledItemsContainer,
  StyledRadioContainer,
  StyledTextArea,
} from "./styles";
import { Button } from "../../../../../../components/Button/Button";
import RadioSupplier from "../../../../../../components/RadioSupplier/RadioSupplier";
import RadioMan from "../../../../../../components/RadioMan/RadioMan";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import Table from "./Table";
import { useMsal } from "@azure/msal-react";

function Form({ theme }: INavProps) {
  const owner = localStorage.getItem("@owner");
  const { accounts } = useMsal();
  const activeUser = accounts[0].username;
  const { createPurchaseRequest, getActiveUserSAP } = useContext(UserContext);

  const methods = useForm<IPurchaseRequest>();
  const [, setItems] = useState<IItemRequest[]>([]);
  const [listItems, setListItems] = useState<IItemRequest[]>([]);
  const [project, setProject] = useState<string>("");
  const [management, setManagement] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [maintence, setMaintence] = useState<string>("");
  const [comments, setComments] = useState<string>("");

  const onSubmit: SubmitHandler<IPurchaseRequest> = (formData) => {
    const baseRequest: IPurchaseRequest = {
      RequriedDate: formData.RequriedDate,
      U_SNT_Suprimento: supplier,
      U_SNT_SC_Manut: maintence,
      Comments: comments,
      DocumentLines: [],
      DocumentsOwner: Number(owner),
    };

    if (listItems.length > 0) {
      const requestWithItems: IPurchaseRequest = {
        ...baseRequest,
        DocumentLines: listItems,
      };
      createPurchaseRequest(requestWithItems);
    } else {
      createPurchaseRequest(baseRequest);
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("@savedItems") || "[]");
    if (savedItems) {
      setListItems(savedItems);
    }
    getActiveUserSAP(activeUser);
  }, []);

  const onSubmitError = (errors: any) => {
    console.error(errors);
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}>
        <StyledContainerFields>
          <DatePickerComponent
            label="Data da necessidade"
            setRegister="RequriedDate"
          />
          <SelectItems
            setItems={setItems}
            listItems={listItems}
            setListItems={setListItems}
            setProject={setProject}
            project={project}
            setManagement={setManagement}
            management={management}
          />
          <StyledRadioContainer>
            <RadioSupplier theme={theme} setSupplier={setSupplier} />
            <RadioMan theme={theme} setMaintence={setMaintence} />
          </StyledRadioContainer>
        </StyledContainerFields>
        {listItems.length > 0 && (
          <StyledItemsContainer>
            <h3>Itens</h3>
            <Table setListItems={setListItems} listItems={listItems} />
          </StyledItemsContainer>
        )}
        <label>Observações</label>
        <StyledTextArea
          maxLength={1500}
          onChange={(e) => setComments(e.target.value)}
        />
        <Button
          type="submit"
          name="Solicitar"
          widthsize="med2"
          color="outline-black"
        />
      </StyledForm>
    </FormProvider>
  );
}

export default Form;
