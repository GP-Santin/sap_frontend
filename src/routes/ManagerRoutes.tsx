import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { callMsGraph } from "../utils/MsGraphApiCall";
import { Navigate, Outlet } from "react-router-dom";

function ManagerRoutes() {
  const { instance, accounts, inProgress } = useMsal();
  const [isUserInGroup, setIsUserInGroup] = useState(false);

  useEffect(() => {
    const checkUserGroupMembership = async () => {
      if (accounts.length > 0 && !inProgress) {
        try {
          if (!instance.getActiveAccount()) {
            await instance.handleRedirectPromise();
          }

          const accessTokenRequest = {
            scopes: ["User.Read", "GroupMember.Read.All"],
            account: accounts[0],
          };

          const response = await instance.acquireTokenSilent(
            accessTokenRequest
          );

          const userGroups = await callMsGraph(response.accessToken);

          const groupId = "318751fc-cef8-40b3-91b6-41a545e10539";
          const isUserInGroup = userGroups.some(
            (group: { id: string }) => group.id === groupId
          );

          setIsUserInGroup(isUserInGroup);
        } catch (error) {
          console.error(
            "Erro ao obter informações do usuário ou grupos:",
            error
          );
        }
      }
    };

    checkUserGroupMembership();
  }, [instance, accounts, inProgress]);

  return isUserInGroup ? <Outlet /> : <Outlet />;
}

export default ManagerRoutes;
