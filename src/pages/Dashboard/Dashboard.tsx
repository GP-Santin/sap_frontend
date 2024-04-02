import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { DashboardContainer } from "./styles";
import { UserContext } from "../../providers/UserContext/UserContext";
import { useMsal } from "@azure/msal-react";
function Dashboard({ toggleTheme, theme }: INavProps) {
  const { isApprover } = useContext(UserContext);
  const { accounts } = useMsal();
  const userMail = accounts[0].username;
  useEffect(() => {
    isApprover(userMail);
  }, []);
  return (
    <DashboardContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
    </DashboardContainer>
  );
}

export default Dashboard;
