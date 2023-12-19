import { useMsal } from "@azure/msal-react";
import { Button, ButtonContainer, Icon, StyledLogin } from "./styles";
import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { useState } from "react";

function LoginPage({ theme, themeToggler }: LoginPageProps) {
  const { instance } = useMsal();
  const [icon, setIcon] = useState(theme === "light" ? moonIcon : sunIcon);

  const toggleIcon = () => {
    const newIcon = icon === sunIcon ? moonIcon : sunIcon;
    setIcon(newIcon);
    themeToggler();
  };

  return (
    <>
      <Icon onClick={toggleIcon}>
        <img src={icon} alt="Trocar Tema" width="30" height="30" />
      </Icon>
      <StyledLogin>
        <h1>Login</h1>
        <ButtonContainer>
          <Button
            onClick={() => {
              instance.loginPopup();
            }}
          >
            Fazer Login
          </Button>
        </ButtonContainer>
      </StyledLogin>
    </>
  );
}

export default LoginPage;
