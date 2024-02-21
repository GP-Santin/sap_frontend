import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
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
import { StyledLineItems, StyledTotalContainer } from "./styles";
import BusinessPartners from "../../../../../../components/BusinessPartners/BusinessPartners";
import SelectItemsRegularization from "../SelectItemsRegularization/SelectItemsRegularization";
import { Button } from "../../../../../../components/Button/Button";
import { useMsal } from "@azure/msal-react";
import SelectShipping from "../SelectShipping/SelectShipping";
import SelectPaymentMethod from "../SelectPaymentMethod/SelectPaymentMethod";
import SelectBranch from "../SelectBranch/SelectBranch";
import TableComponent from "./Table";

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
  const [comments, setComments] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [businessPartner, setBusinessPartner] = useState<string>("");
  const [docTotal, setDocTotal] = useState<string>("");
  const [lineTotal, setLineTotal] = useState<string>("");
  const [transportationCode, setTransportationCode] = useState<number>(-1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [usage, setUsage] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [warehouseCode, setWarehouseCode] = useState("");
  const [usageInput, setUsageInput] = useState("");

  const onSubmit: SubmitHandler<IOrderRequest> = (formData) => {
    const baseRequest: IOrderRequest = {
      RequriedDate: formData.RequriedDate,
      TaxDate: formData.TaxDate,
      DocDueDate: formData.DocDueDate,
      U_SNT_Suprimento: "NÃO",
      U_SNT_SC_Manut: "N",
      Comments: comments,
      DocumentLines: [],
      DocumentsOwner: Number(owner),
      CardCode: businessPartner,
      DocTotal: docTotal ? parseFloat(docTotal) : 0,
      Project: docProject,
      SalesPersonCode: Number(salesPerson),
      U_SNT_Consumo: "Interno",
      TransportationCode: transportationCode,
      U_SNT_MetodoPagto: paymentMethod,
      BPL_IDAssignedToInvoice: Number(branch),
      U_SNT_Requester: import.meta.env.VITE_SAP_LOGIN,
      U_SNT_Finalidade: "2",
    };

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
    getActiveUserSAP(activeUser);
  }, [lineTotal, docTotal]);

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <SelectBranch
          setWarehouseCode={setWarehouseCode}
          setBranch={setBranch}
        />
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
            <SelectShipping setTransportationCode={setTransportationCode} />
            <SelectPaymentMethod setPaymentMethod={setPaymentMethod} />
          </StyledLineItems>
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
            warehouseCode={warehouseCode}
            branch={branch}
            setUsageInput={setUsageInput}
            usageInput={usageInput}
            setWarehouseCode={setWarehouseCode}
          />
        </StyledContainerFields>
        {listItems.length > 0 && (
          <StyledItemsContainer>
            <h3>Itens</h3>
            <TableComponent
              listItems={listItems}
              setListItems={setListItems}
              handleDocTotalChange={handleDocTotalChange}
              setDocTotal={setDocTotal}
              setLineTotal={setLineTotal}
              lineTotal={lineTotal}
              setDocProject={setDocProject}
              theme={theme}
              usageInput={usageInput}
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
