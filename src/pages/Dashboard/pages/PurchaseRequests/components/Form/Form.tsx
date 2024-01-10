import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DatePickerComponent from "../../../../../../components/DatePicker/DatePicker";
import { useContext, useEffect, useState } from "react";
import { IItemRequest, IPurchaseRequest } from "./@types";
import SelectItems from "../../../../../../components/SelectItem/SelectItems";
import {
  StyledContainerFields,
  StyledForm,
  StyledItemsContainer,
  StyledRadioContainer,
  StyledTable,
  StyledTrashIcon,
} from "./styles";
import { Button } from "../../../../../../components/Button/Button";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";
import RadioSupplier from "../../../../../../components/RadioSupplier/RadioSupplier";
import RadioMan from "../../../../../../components/RadioMan/RadioMan";
import { Input } from "../../../../../../components/Input/Input";
import { FaPlus, FaMinus } from "react-icons/fa";

function Form() {
  const methods = useForm<IPurchaseRequest>();

  const [items, setItems] = useState<IItemRequest[]>([]);
  const [listItems, setListItems] = useState<IItemRequest[]>([]);
  const [project, setProject] = useState<string>("");
  const [management, setManagement] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [maintence, setMaintence] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const { createPurchaseRequest } = useContext(UserContext);
  const savedItems = JSON.parse(localStorage.getItem("@savedItems") || "[]");

  const onSubmit: SubmitHandler<IPurchaseRequest> = (formData) => {
    const baseRequest: IPurchaseRequest = {
      RequriedDate: formData.RequriedDate,
      U_SNT_Suprimento: supplier,
      U_SNT_SC_Manut: maintence,
      Comments: comments,
      DocumentLines: [],
    };

    if (listItems.length > 0) {
      const requestWithItems: IPurchaseRequest = {
        ...baseRequest,
        DocumentLines: listItems,
      };

      console.log(requestWithItems);
      createPurchaseRequest(requestWithItems);
    } else {
      console.log(baseRequest);
      createPurchaseRequest(baseRequest);
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
            setManagement={setManagement}
            management={management}
          />
          <StyledRadioContainer>
            <RadioSupplier setSupplier={setSupplier} />
            <RadioMan setMaintence={setMaintence} />
          </StyledRadioContainer>
          <Input
            widthsize="large3"
            label="Comentários"
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
                {listItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemDescription}</td>
                    <td className="quantity">
                      <FaPlus onClick={() => handleIncreaseQuantity(index)} />
                      {item.Quantity}
                      <FaMinus onClick={() => handleDecreaseQuantity(index)} />
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
