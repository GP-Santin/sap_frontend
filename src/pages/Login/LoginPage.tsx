import { useMsal } from "@azure/msal-react";

function LoginPage() {
  const { instance } = useMsal();

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <button
              onClick={async () => {
                try {
                  await instance.loginPopup();
                } catch (error) {
                  console.error("Erro durante o login:", error);
                }
              }}
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
