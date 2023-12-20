import { useMsal } from "@azure/msal-react";
import { LoginForm } from "./components/LoginForm";
import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { Icon } from "../Login/styles";
import { useState } from "react";
import { StyledSAPLogin } from "./styles";

function SAPLogin({ theme, toggleTheme }: SAPLoginProps) {
  const [icon, setIcon] = useState(theme === "light" ? moonIcon : sunIcon);
  const { accounts } = useMsal();
  const activeAccount = accounts[0];

  const toggleIcon = () => {
    const newIcon = icon === sunIcon ? moonIcon : sunIcon;
    setIcon(newIcon);
    toggleTheme();
  };

  return (
    <StyledSAPLogin>
      <Icon onClick={toggleIcon}>
        <img src={icon} alt="Trocar Tema" width="30" height="30" />
      </Icon>
      <h2>Olá, {activeAccount ? activeAccount.name : "Usuário"}</h2>
      <h3>Faça login no SAP utilizando suas credenciais.</h3>
      <LoginForm theme={theme} toggleTheme={toggleTheme} />
    </StyledSAPLogin>
  );
}

export default SAPLogin;
