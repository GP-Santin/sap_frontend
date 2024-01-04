import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../../../../components/Input/Input";
import { StyledContainerPurchaseFields, StyledForm } from "./style";
import { TPurchase, purchaseFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../../../../components/Button/Button";
import { IBusinessPartner } from "../../../../../../providers/UserContext/@types";
import Modal from "react-modal";
import { UserContext } from "../../../../../../providers/UserContext/UserContext";

function FormRequest() {
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const businessPartnersString = localStorage.getItem("@businesspartners");
  const businessPartners = businessPartnersString
    ? JSON.parse(businessPartnersString)
    : [];
  const { user, getActiveUserSAP, salesPerson } = useContext(UserContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPurchase>({
    resolver: zodResolver(purchaseFormSchema),
  });

  const submit: SubmitHandler<TPurchase> = async (formData) => {
    console.log(formData);
    reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setValue(userInput);

    const filteredPartners = businessPartners.filter(
      (partner: IBusinessPartner) =>
        partner.CardName.toLowerCase().includes(userInput.toLowerCase())
    );

    setShowSuggestions(!!userInput);

    if (filteredPartners.length === 1) {
      setValue(filteredPartners[0].CardName);
    }
  };

  useEffect(() => {
    if (user) {
      getActiveUserSAP("filipe.parisi@gruposantin.com.br");
    }

    if (salesPerson) {
      console.log(salesPerson.SalesEmployeeName);
    }
  }, [user]);

  return (
    <>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledContainerPurchaseFields>
          <Input
            widthsize="med2"
            label="Fornecedor"
            type="text"
            {...register("fornecedor")}
            value={value}
          />
          <Input widthsize="med2" label="Nome" type="text" />
        </StyledContainerPurchaseFields>
        <div>
          <Input
            widthsize="med2"
            label="Comprador"
            type="text"
            {...register("comprador")}
            value={salesPerson.SalesEmployeeName}
            style={{ pointerEvents: "none" }}
          />
        </div>
        {/* <Input
            widthsize="small"
            type="text"
            value="DTI006"
            label="Solicitante"
            disabled={true}
            {...register("solicitante")}
          /> */}
        <div>
          <Input label="Número" widthsize="small" />
        </div>
      </StyledForm>
      <Button
        color="outline-black"
        name="Adicionar pedido"
        widthsize="med2"
        type="submit"
      />
    </>
  );
}

export default FormRequest;
