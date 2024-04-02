import NavBar from "../../../../components/NavBar/NavBar";
import Form from "./components/Form/Form";
import { PurchaseContainer, ContentContainer } from "./styles";

function PurchaseRequests({ theme, toggleTheme }: INavProps) {
  return (
    <PurchaseContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <ContentContainer>
        <h2>Solicitação de Compras</h2>
        <Form toggleTheme={toggleTheme} theme={theme} />
      </ContentContainer>
    </PurchaseContainer>
  );
}

export default PurchaseRequests;
