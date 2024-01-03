import NavBar from "../../../../components/NavBar/NavBar";
import { Input } from "../../../../components/Input/Input";
import { useForm } from "react-hook-form";
import { TPurchaseRequest } from "./schema";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../../providers/UserContext/UserContext";
import { PurchaseContainer } from "./styles";

function PurchaseRequests() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPurchaseRequest>({});
  const { getItems } = useContext(UserContext);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      
    </div>
  );
}

export default PurchaseRequests;
