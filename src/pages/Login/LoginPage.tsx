import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

function LoginPage() {
  const { instance } = useMsal();

  useEffect(() => {
    instance.setActiveAccount(instance.getAllAccounts()[0]);
  }, [])

  return (
    <div>
      <div>
        <div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <h1>Login</h1>
          </div>
          <div>
            <button onClick={() => instance.loginPopup()}>Fazer Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
