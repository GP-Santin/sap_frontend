import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldErrors,
} from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
import { IItemRequest, IPurchaseRequest } from "./@types";
import SelectItems from "../SelectItems/SelectItems";
import {
  StyledContainerFields,
  StyledForm,
  StyledTextArea,
  StyledTitleContainer,
} from "./styles";
import { Button } from "../../../../../../components/Button/Button";
import RadioMan from "../../../../../../components/RadioMan/RadioMan";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import Table from "./Table";
import { useMsal } from "@azure/msal-react";
import { StyledTotalContainer } from "../../../Regularization/components/Form/styles";
import SelectBranch from "../../../Regularization/components/SelectBranch/SelectBranch";

function Form({ theme }: INavProps) {
  const owner = localStorage.getItem("@owner");
  const { accounts } = useMsal();
  const activeUser = accounts[0].username;
  const { createPurchaseRequest, getActiveUserSAP } = useContext(UserContext);
  const methods = useForm<IPurchaseRequest>();
  const [, setItems] = useState<IItemRequest[]>([]);
  const [listItems, setListItems] = useState<IItemRequest[]>([]);
  const [project, setProject] = useState("");
  const [managerial, setManagerial] = useState("");
  const [management, setManagement] = useState("");
  const [maintence, setMaintence] = useState("");
  const [comments, setComments] = useState("");
  const [branch, setBranch] = useState("");
  const [warehouseCode, setWarehouseCode] = useState("");
  const email = accounts[0].username;

  const onSubmit: SubmitHandler<IPurchaseRequest> = (formData) => {
    const baseRequest: IPurchaseRequest = {
      RequriedDate: formData.RequriedDate,
      U_SNT_Suprimento: "SIM",
      U_SNT_SC_Manut: maintence,
      Comments: comments,
      DocumentLines: [],
      DocumentsOwner: Number(owner),
      BPL_IDAssignedToInvoice: Number(branch),
      RequesterEmail: email,
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

  const onSubmitError = (errors: FieldErrors) => {
    console.error(errors);
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}>
        <SelectBranch
          setWarehouseCode={setWarehouseCode}
          setBranch={setBranch}
        />
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
            setWarehouseCode={setWarehouseCode}
            warehouseCode={warehouseCode}
            managerial={managerial}
            setManagerial={setManagerial}
          />
          <div>
            <RadioMan theme={theme} setMaintence={setMaintence} />
          </div>
        </StyledContainerFields>
        {listItems.length > 0 && (
          <StyledTitleContainer>
            <h3>Itens</h3>
            <Table
              setListItems={setListItems}
              listItems={listItems}
              theme={theme}
            />
          </StyledTitleContainer>
        )}
        <StyledTotalContainer>
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
        />
      </StyledForm>
    </FormProvider>
  );
}

export default Form;
