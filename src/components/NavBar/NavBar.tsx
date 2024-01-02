import { useState } from "react";
import "./styles.css";
import { useMsal } from "@azure/msal-react";

function NavBar() {
  const [burguerClass, setBurguerClass] = useState("burguer-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const { instance } = useMsal();


  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurguerClass("burguer-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurguerClass("burguer-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <nav>
        <div className="burguer-menu" onClick={updateMenu}>
          <div className={burguerClass}></div>
          <div className={burguerClass}></div>
          <div className={burguerClass}></div>
        </div>
      </nav>
      <div className={`menu ${menuClass}`}>
        <ul>
          <a href="#">Solicitação de Compras</a>
          <a href="#">Regularização de Notas</a>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
