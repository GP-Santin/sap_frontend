import NavBar from "../../../../components/NavBar/NavBar";
import Form from "./components/Form/Form";
import FormRequest from "./components/FormRequest/FormRequest";
import { PurchaseContainer, ContentContainer } from "./styles";

function PurchaseRequests() {
  return (
    <PurchaseContainer>
      <NavBar />
      <ContentContainer>
        {/* <FormRequest /> */}
        <Form />
      </ContentContainer>
    </PurchaseContainer>
  );
}

export default PurchaseRequests;
