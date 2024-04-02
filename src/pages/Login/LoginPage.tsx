import { useMsal } from "@azure/msal-react";
import { Button, ButtonContainer, StyledLogin } from "./styles";
function LoginPage() {
  const { instance } = useMsal();

  return (
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
  );
}

export default LoginPage;
