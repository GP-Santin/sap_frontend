import NavBar from "../../components/NavBar/NavBar";
import { DashboardContainer } from "./styles";
function Dashboard({ toggleTheme, theme }: INavProps) {
  return (
    <DashboardContainer>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
    </DashboardContainer>
  );
}

export default Dashboard;
