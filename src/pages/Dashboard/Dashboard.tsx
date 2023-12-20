import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { useContext, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { UserContext } from "../../providers/UserContext/UserContext";
function Dashboard({ theme, themeToggler }: DashboardProps) {
  const [icon, setIcon] = useState(theme === "light" ? moonIcon : sunIcon);
  const { instance, accounts } = useMsal();
  const activeAccount = accounts[0];
  const { user } = useContext(UserContext);
  const toggleIcon = () => {
    const newIcon = icon === sunIcon ? moonIcon : sunIcon;
    setIcon(newIcon);
    themeToggler();
  };
  return (
    <div>
      <h1>Dashboard {activeAccount ? activeAccount.name : "Usuário"}</h1>
      <h3>Bem vindo {user?.UserName}</h3>
      <button onClick={() => instance.logoutPopup()}>Logout</button>
    </div>
  );
}

export default Dashboard;
