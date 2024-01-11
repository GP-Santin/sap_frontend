import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
import SelectItems from "../../../../../../components/SelectItems/SelectItems";
import { Button } from "../../../../../../components/Button/Button";
import RadioSupplier from "../../../../../../components/RadioSupplier/RadioSupplier";
import RadioMan from "../../../../../../components/RadioMan/RadioMan";
import { Input } from "../../../../../../components/Input/Input";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import {
  IItemRequest,
  IPurchaseRequest,
} from "../../../PurchaseRequests/components/Form/@types";
import {
  StyledContainerFields,
  StyledForm,
  StyledItemsContainer,
  StyledMinus,
  StyledPlus,
  StyledRadioContainer,
  StyledTable,
  StyledTrashIcon,
} from "../../../PurchaseRequests/components/Form/styles";

function Form() {
  const owner = localStorage.getItem("@owner");
  const { getActiveUserSAP } = useContext(UserContext);
  const userConnected = "filipe.parisi@gruposantin.com.br";

  useEffect(() => {
    getActiveUserSAP(userConnected);
  }, []);
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
      // (requestWithItems);
    } else {
      // createPurchaseRequest(baseRequest);
    }
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems.splice(index, 1);
    setListItems(updatedItems);
    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    updatedItems[index].Quantity += 1;
    setListItems(updatedItems);
    localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedItems = [...listItems];
    if (updatedItems[index].Quantity > 0) {
      updatedItems[index].Quantity -= 1;
      setListItems(updatedItems);
      localStorage.setItem("@savedItems", JSON.stringify(updatedItems));
    }
  };

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("@savedItems") || "[]");
    if (savedItems) {
      setListItems(savedItems);
    }
  }, []);

  const onSubmitError = (errors: any) => {
    console.error(errors);
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}>
        <StyledContainerFields>
          <DatePickerComponent />
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
            <RadioSupplier setSupplier={setSupplier} />
            <RadioMan setMaintence={setMaintence} />
          </StyledRadioContainer>
          <Input
            $widthsize="large3"
            label="Observação"
            onChange={(e) => setComments(e.target.value)}
            style={{ height: "10rem" }}
          />
        </StyledContainerFields>
        {listItems.length > 0 && (
          <StyledItemsContainer>
            <h3>Itens</h3>
            <StyledTable>
              <thead>
                <tr>
                  <th>Código do item</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Projeto</th>
                  <th>Gerencial</th>
                </tr>
              </thead>
              <tbody>
                {listItems.map((item: IItemRequest, index: number) => (
                  <tr key={index}>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemDescription}</td>
                    <td className="quantity">
                      <StyledPlus
                        onClick={() => handleIncreaseQuantity(index)}
                      />
                      {item.Quantity}
                      <StyledMinus
                        onClick={() => handleDecreaseQuantity(index)}
                      />
                    </td>
                    <td>{item.ProjectCode}</td>
                    <td>{item.CostingCode2}</td>
                    <td>
                      <StyledTrashIcon
                        onClick={() => handleDeleteItem(index)}
                      />
                    </td>
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
