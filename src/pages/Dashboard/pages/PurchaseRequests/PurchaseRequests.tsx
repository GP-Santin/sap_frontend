import NavBar from "../../../../components/NavBar/NavBar";
import FormRequest from "./components/FormRequest/FormRequest";
import { PurchaseContainer, ContentContainer } from "./styles";

function PurchaseRequests() {
  return (
    <PurchaseContainer>
      <NavBar />
      <ContentContainer>
        <FormRequest />
      </ContentContainer>
    </PurchaseContainer>
  );
}

export default PurchaseRequests;
