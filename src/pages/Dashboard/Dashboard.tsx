import { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { DashboardContainer } from "./styles";
import { AppContext } from "../../providers/AppContext/AppProviders";
function Dashboard({ toggleTheme, theme }: any) {
  const { getActiveUserSAP } = useContext(AppContext);
  const userConnected = "filipe.parisi@gruposantin.com.br";

  useEffect(() => {
    getActiveUserSAP(userConnected);
  }, []);

  return (
    <DashboardContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
    </DashboardContainer>
  );
}

export default Dashboard;
