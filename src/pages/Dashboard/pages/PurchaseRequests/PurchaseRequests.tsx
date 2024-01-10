import NavBar from "../../../../components/NavBar/NavBar";
import Form from "./components/Form/Form";
import { PurchaseContainer, ContentContainer } from "./styles";

function PurchaseRequests() {

  return (
    <PurchaseContainer>
      <NavBar />
      <ContentContainer>
        <Form />
      </ContentContainer>
    </PurchaseContainer>
  );
}

export default PurchaseRequests;
