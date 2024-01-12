import { useState } from "react";
import "./styles.css";
import {
  BurguerStyled,
  StyledIconContainer,
  StyledList,
  StyledListTitle,
  StyledMenu,
  StyledNav,
} from "./styles";
import { FaAngleDown } from "react-icons/fa";
import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { Icon } from "./styles";
import { useMsal } from "@azure/msal-react";

function NavBar({ toggleTheme, theme }: any) {
  const [burguerClass, setBurguerClass] = useState("burguer-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section deactivated");
  const { instance } = useMsal();
  const activeUser = instance.getAllAccounts()[0];

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
            src={theme === "light" ? moonIcon : sunIcon}
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
                  transform: isDropdownOpen ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "ease-out 0.4s",
                }}
              />
            </StyledListTitle>
            {isDropdownOpen && (
              <ul>
                <li>
                  <a href="/dashboard/purchase-requests">
                    Solicitação de Compras
                  </a>
                </li>
                <li>
                  <a href="/dashboard/regularization">Regularização</a>
                </li>
              </ul>
            )}
          </StyledList>
        </ul>
      </StyledMenu>
    </>
  );
}

export default NavBar;
