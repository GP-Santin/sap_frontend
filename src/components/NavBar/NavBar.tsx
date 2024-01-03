import { useEffect, useState } from "react";
import "./styles.css";
import Theme from "../Theme/Theme";
import {
  BurguerStyled,
  Container,
  StyledList,
  StyledListTitle,
  StyledMenu,
  StyledNav,
} from "./styles";
import { FaAngleDown } from "react-icons/fa";

function NavBar({ toggleTheme, theme }: any) {
  const [burguerClass, setBurguerClass] = useState("burguer-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section deactivated");

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
    <Container>
      <Theme toggleTheme={toggleTheme} theme={theme} />
      <StyledNav>
        <div className="burguer-menu" onClick={updateMenu}>
          <BurguerStyled className={burguerClass}></BurguerStyled>
          <BurguerStyled className={burguerClass}></BurguerStyled>
          <BurguerStyled className={burguerClass}></BurguerStyled>
        </div>
      </StyledNav>
      <StyledMenu className={`menu ${menuClass}`}>
        <ul>
          <StyledList onClick={toggleDropdown}>
            <StyledListTitle onClick={toggleSection} className={activeSection}>
              Compras{" "}
              <FaAngleDown
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "ease-out 0.4s",
                }}
              />
            </StyledListTitle>
            {isDropdownOpen && (
              <ul>
                <li>
                  <a href="#">Solicitação de Compras</a>
                </li>
                <li>
                  <a href="#">Regularização de Notas</a>
                </li>
              </ul>
            )}
          </StyledList>
        </ul>
      </StyledMenu>
    </Container>
  );
}

export default NavBar;
