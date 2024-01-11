import NavBar from "../../../../components/NavBar/NavBar";
import Form from "./components/Form/Form";
import { PurchaseContainer, ContentContainer } from "./styles";

function PurchaseRequests() {

  return (
    <PurchaseContainer>
      <NavBar />
      <ContentContainer>
        <h2>Solicitação de Compra</h2>
        <Form />
      </ContentContainer>
    </PurchaseContainer>
  );
}

export default PurchaseRequests;
