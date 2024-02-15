import axios from "axios";
import { msalInstance } from "../auth-config";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

function ManagerRoutes() {
  const [isUserInGroup, setIsUserInGroup] = useState(false);
  const { accounts } = useMsal();
  const email = accounts[0].username;

  useEffect(() => {
    const initializeMSAL = async () => {
      try {
        await msalInstance.initialize();

        const activeAccount = accounts[0];
        if (!activeAccount) {
          console.error("Nenhuma conta ativa encontrada");
          return;
        }

        getGroupMembers(activeAccount);
      } catch (error) {
        console.error("Erro ao inicializar MSAL", error);
      }
    };

    initializeMSAL();
  }, []);

  const getGroupMembers = async (activeAccount: any) => {
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["openid", "profile", "user.read", "group.read.all"],
        account: activeAccount,
      });
      const accessToken = tokenResponse.accessToken;
      const groupId = "318751fc-cef8-40b3-91b6-41a545e10539";
      const url = `https://graph.microsoft.com/v1.0/groups/${groupId}/members`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const groupMembers = response.data.value;
      console.log(groupMembers);

      setIsUserInGroup(
        groupMembers.some((member: any) => member.userPrincipalName === email)
      );
    } catch (error) {
      console.error("Erro ao obter membros do grupo", error);
    }
  };

  return isUserInGroup ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default ManagerRoutes;
