import NavBar from "../../../../components/NavBar/NavBar";
import { ContentContainer } from "../PurchaseRequests/styles";
import Form from "./components/Form/Form";
import { RegularizationContainer } from "./styles";

function Regularization() {
  return (
    <RegularizationContainer>
      <NavBar />
      <ContentContainer>
        <h2>Regularização</h2>
        <Form />
      </ContentContainer>
    </RegularizationContainer>
  );
}

export default Regularization;
