import { useForm, FormProvider, SubmitHandler, FieldErrors } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
import RadioSupplier from "../../../../../../components/RadioSupplier/RadioSupplier";
import RadioMan from "../../../../../../components/RadioMan/RadioMan";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import {
  IItemOrder,
  IOrderRequest,
} from "../../../Regularization/components/Form/@types";
import {
  StyledContainerFields,
  StyledForm,
  StyledItemsContainer,
  StyledTextArea,
} from "../../../PurchaseRequests/components/Form/styles";
import Table from "./Table";
import { StyledLineItems, StyledTotalContainer } from "./styles";
import BusinessPartners from "../../../../../../components/BusinessPartners/BusinessPartners";
import SelectItemsRegularization from "../../../../../../components/SelectItemsRegularization/SelectItemsRegularization";
import { Button } from "../../../../../../components/Button/Button";
import { useMsal } from "@azure/msal-react";
import SelectConsumption from "../SelectConsumption/SelectConsumption";
import SelectShipping from "../SelectShipping/SelectShipping";
import SelectPaymentMethod from "../SelectPaymentMethod/SelectPaymentMethod";

function Form({ theme }: INavProps) {
  const owner = localStorage.getItem("@owner");
  const salesPerson = localStorage.getItem("@salesPersonCode");
  const { accounts } = useMsal();
  const activeUser = accounts[0].username;
  const { createPurchaseQuotations, getActiveUserSAP } =
    useContext(UserContext);
  const methods = useForm<IOrderRequest>();

  const [, setItems] = useState<IItemOrder[]>([]);
  const [listItems, setListItems] = useState<IItemOrder[]>([]);
  const [project, setProject] = useState<string>("");
  const [docProject, setDocProject] = useState<string>("");
  const [management, setManagement] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [maintence, setMaintence] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [businessPartner, setBusinessPartner] = useState<string>("");
  const [docTotal, setDocTotal] = useState<string>("");
  const [lineTotal, setLineTotal] = useState<string>("");
  const [consumption, setConsumption] = useState<string>("");
  const [transportationCode, setTransportationCode] = useState<number>(-1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [usage, setUsage] = useState<string>("");

  const onSubmit: SubmitHandler<IOrderRequest> = (formData) => {
    const baseRequest: IOrderRequest = {
      RequriedDate: formData.RequriedDate,
      TaxDate: formData.TaxDate,
      DocDueDate: formData.DocDueDate,
      U_SNT_Suprimento: supplier,
      U_SNT_SC_Manut: maintence,
      Comments: comments,
      DocumentLines: [],
      DocumentsOwner: Number(owner),
      CardCode: businessPartner,
      DocTotal: docTotal ? parseFloat(docTotal) : 0,
      Project: docProject,
      SalesPersonCode: Number(salesPerson),
      U_SNT_Consumo: consumption,
      TransportationCode: transportationCode,
      U_SNT_MetodoPagto: paymentMethod,
    };

    getActiveUserSAP(activeUser);

    if (listItems.length > 0) {
      const requestWithItems: IOrderRequest = {
        ...baseRequest,
        DocumentLines: listItems,
      };
      createPurchaseQuotations(requestWithItems);
    } else {
      createPurchaseQuotations(baseRequest);
    }
  };

  const onSubmitError = (errors: FieldErrors) => {
    console.error(errors);
  };

  const handleDocTotalChange = (list: IItemOrder[]) => {
    const total = list.reduce((acc, item) => {
      return acc + item.LineTotal;
    }, 0);
    setDocTotal(total.toString());
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("@savedItems") || "[]");
    if (savedItems) {
      setListItems(savedItems);
    }
  }, [lineTotal, docTotal]);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}>
        <StyledContainerFields>
          <StyledLineItems>
            <DatePickerComponent
              label="Data necessária"
              setRegister="RequriedDate"
            />
            <DatePickerComponent
              label="Data do documento"
              setRegister="TaxDate"
            />
            <DatePickerComponent
              label="Data do vencimento"
              setRegister="DocDueDate"
            />
            <BusinessPartners
              businessPartner={businessPartner}
              setBusinessPartner={setBusinessPartner}
            />
            <SelectConsumption setConsumption={setConsumption} />
            <SelectShipping setTransportationCode={setTransportationCode} />
            <SelectPaymentMethod setPaymentMethod={setPaymentMethod} />
          </StyledLineItems>
          <div>
            <RadioSupplier theme={theme} setSupplier={setSupplier} />
            <RadioMan theme={theme} setMaintence={setMaintence} />
          </div>
          <h3>Adicionar Linhas do documento</h3>
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
            docTotal={docTotal}
            setDocTotal={setDocTotal}
            handleDocTotalChange={handleDocTotalChange}
            setLineTotal={setLineTotal}
            lineTotal={lineTotal}
            setUsage={setUsage}
            usage={usage}
          />
        </StyledContainerFields>
        {listItems.length > 0 && (
          <StyledItemsContainer>
            <h3>Itens</h3>
            <Table
              listItems={listItems}
              setListItems={setListItems}
              handleDocTotalChange={handleDocTotalChange}
              setDocTotal={setDocTotal}
              setLineTotal={setLineTotal}
              lineTotal={lineTotal}
              setDocProject={setDocProject}
            />
          </StyledItemsContainer>
        )}
        <StyledTotalContainer>
          <div>
            <h3>Valor total do pedido</h3>
            <p>R$ {docTotal ? docTotal : 0}</p>
          </div>
          <label>Observações</label>
          <StyledTextArea
            maxLength={1500}
            onChange={(e) => setComments(e.target.value)}
          />
        </StyledTotalContainer>
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
