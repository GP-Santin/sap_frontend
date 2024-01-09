import React, { useEffect, useState } from "react";
import SelectItem from "../SelectItem/SelectItems";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IItem } from "../../providers/AppContext/@types";
import Management from "../Management/Management";
import Projects from "../Projects/Projects";
import { IPurchaseRequest } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/schema";
import { StyledErrorContainer } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/style";
import { Input } from "../Input/Input";
import { DocumentLineField } from "../../pages/Dashboard/pages/PurchaseRequests/components/FormRequest/@types";
import { Button } from "../Button/Button";

interface LineProps {
  setValue: UseFormSetValue<any>;
  filteredItems: IItem[];
  setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  errors: FieldErrors<IPurchaseRequest>;
  listItems: DocumentLineField[];
  setListItems: React.Dispatch<React.SetStateAction<DocumentLineField[]>>;
  register: UseFormRegister<{
    RequriedDate: string;
    U_SNT_Requester: string | null;
    DocumentLines: {
      ItemCode: string;
      ItemDescription: string;
      Quantity: string;
      CostingCode2: string;
      CostingCode: string | null;
      ProjectCode: string;
    }[];
    Comments: string;
  }>;
}

function LineItems({
  listItems,
  setValue,
  filteredItems,
  setFilteredItems,
  errors,
  setListItems,
  register,
}: LineProps & { errors: FieldErrors<IPurchaseRequest> }) {
  const [newItem, setNewItem] = useState({
    ItemCode: "",
    ItemDescription: "",
  });
  const [project, setProject] = useState("");
  const [management, setManagement] = useState("");

  const handleAddItemToList = () => {
    const newItemFormatted: DocumentLineField = {
      LineNum: listItems.length + 1,
      ItemCode: newItem.ItemCode,
      ItemDescription: newItem.ItemDescription,
      CostingCode2: management,
      CostingCode: "",
      U_SNT_Finalidade: "1",
      ProjectCode: project,
      Quantity: "",
    };

    setListItems((prevList) => [...prevList, newItemFormatted]);
  };

  return (
    <>
      <SelectItem
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        errors={errors}
        setValue={setValue}
        setNewItem={setNewItem}
        register={register}
      />
      {/* <StyledErrorContainer>
        <Input
          label="Quantidade"
          widthsize="small"
          {...register("DocumentLines.0.Quantity")}
        />
        {errors.DocumentLines ? (
          <span>{errors.DocumentLines.message}</span>
        ) : null}
      </StyledErrorContainer>
      <Management
        errors={errors}
        management={management}
        setManagement={setManagement}
        setValue={setValue}
      />
      <Projects
        setValue={setValue}
        errors={errors}
        project={project}
        setProject={setProject}
      /> */}
      <Button
        type="button"
        widthsize="small2"
        color="outline-black"
        style={{ marginTop: "1rem" }}
        name="Adicionar item"
        onClick={handleAddItemToList}
      />
    </>
  );
}

export default LineItems;
