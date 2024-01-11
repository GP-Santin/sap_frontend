import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
import RadioSupplier from "../../../../../../components/RadioSupplier/RadioSupplier";
import RadioMan from "../../../../../../components/RadioMan/RadioMan";
import { Input } from "../../../../../../components/Input/Input";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import {
  IItemOrder,
  IPurchaseRequest,
} from "../../../PurchaseRequests/components/Form/@types";
import {
  StyledContainerFields,
  StyledForm,
  StyledItemsContainer,
  StyledRadioContainer,
} from "../../../PurchaseRequests/components/Form/styles";
import Table from "./Table";
import { StyledLineItems } from "./styles";
import BusinessPartners from "../../../../../../components/BusinessPartners/BusinessPartners";
import SelectItemsRegularization from "../../../../../../components/SelectItemsRegularization/SelectItemsRegularization";
import { Button } from "../../../../../../components/Button/Button";

function Form() {
  const owner = localStorage.getItem("@owner");
  const { getActiveUserSAP } = useContext(UserContext);
  const [, setItems] = useState<IItemOrder[]>([]);
  const [listItems, setListItems] = useState<IItemOrder[]>([]);
  const [project, setProject] = useState<string>("");
  const [management, setManagement] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [maintence, setMaintence] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  const methods = useForm<IPurchaseRequest>();
  const userConnected = "filipe.parisi@gruposantin.com.br";

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
      // (requestWithItems);
    } else {
      // (baseRequest);
    }
  };

  const onSubmitError = (errors: any) => {
    console.error(errors);
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("@savedItems") || "[]");
    if (savedItems) {
      setListItems(savedItems);
    }
    getActiveUserSAP(userConnected);
  }, []);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}>
        <StyledContainerFields>
          <StyledLineItems>
            <DatePickerComponent />
            <BusinessPartners />
          </StyledLineItems>
          <SelectItemsRegularization
            setItems={setItems}
            listItems={listItems}
            setListItems={setListItems}
            setProject={setProject}
            project={project}
            setManagement={setManagement}
            management={management}
            setUnitPrice={setUnitPrice}
            unitPrice={unitPrice}
          />
          <StyledRadioContainer>
            <RadioSupplier setSupplier={setSupplier} />
            <RadioMan setMaintence={setMaintence} />
          </StyledRadioContainer>
        </StyledContainerFields>
        {listItems.length > 0 && (
          <StyledItemsContainer>
            <h3>Itens</h3>
            <Table listItems={listItems} setListItems={setListItems} />
          </StyledItemsContainer>
        )}
        <Input
          $widthsize="med2"
          label="Observações"
          style={{ wordWrap: "break-word", wordBreak: "break-all" }}
        />
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
