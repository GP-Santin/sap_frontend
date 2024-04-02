import NavBar from "../../../../components/NavBar/NavBar";
import { ContentContainer } from "../PurchaseRequests/styles";
import Form from "./components/Form/Form";
import { RegularizationContainer } from "./styles";

function Regularization({ theme, toggleTheme }: INavProps) {
  return (
    <RegularizationContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <ContentContainer>
        <h2>Regularização de Nota Fiscal de Entrada</h2>
        <Form toggleTheme={toggleTheme} theme={theme} />
      </ContentContainer>
    </RegularizationContainer>
  );
}

export default Regularization;
