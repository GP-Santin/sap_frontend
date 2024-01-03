import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { DashboardContainer } from "./styles";
import { UserContext } from "../../providers/UserContext/UserContext";
function Dashboard({ toggleTheme, theme }: any) {
  const { getActiveUserSAP } = useContext(UserContext);

  useEffect(() => {
    getActiveUserSAP();
  }, []);
  return (
    <DashboardContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
    </DashboardContainer>
  );
}

export default Dashboard;
