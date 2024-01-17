import { FaArrowDown } from "react-icons/fa";
import { Input } from "../../../../components/Input/Input";
import NavBar from "../../../../components/NavBar/NavBar";
import { ContentContainer } from "../PurchaseRequests/styles";
import Form from "./components/Form/Form";
import { RegularizationContainer } from "./styles";

function Regularization({ theme, toggleTheme }: INavProps) {
  return (
    <RegularizationContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <ContentContainer>
        <h2>Regularização</h2>
        <Form toggleTheme={toggleTheme} theme={theme} />
        <Input
          widthsize="large3"
          style={{ height: "1rem", cursor: "pointer" }}
          label="Filial"
          icon={<FaArrowDown width={30} color="white" />}
        />
      </ContentContainer>
    </RegularizationContainer>
  );
}

export default Regularization;
