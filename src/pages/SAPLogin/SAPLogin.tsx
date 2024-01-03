import { useMsal } from "@azure/msal-react";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { StyledSAPLogin } from "./styles";
import santinLogo from "../../assets/logo_santin.png";

function SAPLogin() {
  const { accounts } = useMsal();
  const activeAccount = accounts[0];

  return (
    <StyledSAPLogin>
      <img src={santinLogo} alt="SAP" width={200} />
      <h2>Olá, {activeAccount ? activeAccount.name : "Usuário"}</h2>
      <h3>Selecione a base que deseja conectar.</h3>
      <LoginForm />
    </StyledSAPLogin>
  );
}

export default SAPLogin;
