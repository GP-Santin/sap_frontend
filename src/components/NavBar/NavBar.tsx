import { useContext, useState } from "react";
import "./styles.css";
import {
  BurguerStyled,
  StyledIconContainer,
  StyledList,
  StyledListTitle,
  StyledMenu,
  StyledNav,
  StyledUl,
} from "./styles";
import { FaAngleDown } from "react-icons/fa";
import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { Icon } from "./styles";
import { useMsal } from "@azure/msal-react";
import { UserContext } from "../../providers/UserContext/UserContext";

function NavBar({ toggleTheme, theme }: INavProps) {
  const [burguerClass, setBurguerClass] = useState("burguer-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("section deactivated");
  const [listActive, setListActive] = useState("list-unclicked");
  const { instance } = useMsal();
  const activeUser = instance.getAllAccounts()[0];
  const { logoutSAP } = useContext(UserContext);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSection = () => {
    setActiveSection(
      activeSection === "section deactivated"
        ? "section active"
        : "section deactivated"
    );
    setListActive(
      listActive === "list-unclicked" ? "list-clicked" : "list-unclicked"
    );
  };

  return (
    <>
      <StyledNav>
        <div className="burguer-menu" onClick={updateMenu}>
          <BurguerStyled className={burguerClass}></BurguerStyled>
          <BurguerStyled className={burguerClass}></BurguerStyled>
          <BurguerStyled className={burguerClass}></BurguerStyled>
        </div>
        <StyledIconContainer>
          <h3>{activeUser?.name}</h3>
          <Icon
            src={theme == "light" ? moonIcon : sunIcon}
            alt=""
            width={25}
            onClick={toggleTheme}
          />
        </StyledIconContainer>
      </StyledNav>
      <StyledMenu className={`menu ${menuClass}`}>
        <ul id="sections">
          <StyledList onClick={toggleDropdown}>
            <StyledListTitle onClick={toggleSection} className={activeSection}>
              Compras{" "}
              <FaAngleDown
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "all ease-out 0.4s",
                }}
              />
            </StyledListTitle>
            <StyledUl className={listActive}>
              <li>
                <a href="/dashboard/purchase-requests">
                  Solicitação de Compras
                </a>
              </li>
              <li>
                <a href="/dashboard/regularization">Regularização</a>
              </li>
            </StyledUl>
          </StyledList>
          <a onClick={() => logoutSAP()}>Alterar base</a>
        </ul>
      </StyledMenu>
    </>
  );
}

export default NavBar;
