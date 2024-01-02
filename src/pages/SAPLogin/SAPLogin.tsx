import { useMsal } from "@azure/msal-react";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { StyledSAPLogin } from "./styles";
import sapLogo from "../../assets/sap_logo.svg";
import Theme from "../../components/Theme/Theme";

function SAPLogin() {
  const { accounts } = useMsal();
  const activeAccount = accounts[0];

  return (
    <StyledSAPLogin>
      <Theme />
      <img src={sapLogo} alt="SAP" width={200} />
      <h2>Olá, {activeAccount ? activeAccount.name : "Usuário"}</h2>
      <h3>Faça login no SAP utilizando suas credenciais.</h3>
      <LoginForm />
    </StyledSAPLogin>
  );
}

export default SAPLogin;
