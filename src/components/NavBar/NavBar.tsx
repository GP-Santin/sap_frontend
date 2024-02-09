import { useContext, useState } from "react";
import "./styles.css";
import {
  BurguerStyled,
  StyledBackdrop,
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
import { useOutsideClick } from "../../hooks/outsideClick";
import { MdRequestQuote } from "react-icons/md";
import { MdRequestPage } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useManagerContext } from "../../providers/ManagerContext/ManagerProvider";

function NavBar({ toggleTheme, theme }: INavProps) {
  const [burguerClass, setBurguerClass] = useState("burguer-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("section deactivated");
  const [listActive, setListActive] = useState("list-unclicked");
  const [backdropMenu, setBackdropMenu] = useState(false);
  const { instance } = useMsal();
  const { logoutSAP } = useContext(UserContext);
  const activeUser = instance.getAllAccounts()[0];
  const { manager } = useManagerContext();

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurguerClass("burguer-bar clicked");
      setMenuClass("menu visible");
      setBackdropMenu(true);
    } else {
      setBurguerClass("burguer-bar unclicked");
      setMenuClass("menu hidden");
      setBackdropMenu(false);
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const closeMenu = () => {
    setBurguerClass("burguer-bar unclicked");
    setMenuClass("menu hidden");
    setBackdropMenu(false);
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

  const dropdownRef = useOutsideClick({ callback: closeMenu });

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
      <StyledMenu className={`menu ${menuClass}`} ref={dropdownRef}>
        {manager && (
          <StyledList>
            <Link to="/dashboard/manager-approve">Aprovação</Link>
          </StyledList>
        )}
        <ul id="sections">
          <StyledList onClick={toggleDropdown}>
            <StyledListTitle onClick={toggleSection} className={activeSection}>
              <FaShoppingCart />
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
                <MdRequestQuote />
                <Link to="/dashboard/purchase-requests">
                  Solicitação de Compras
                </Link>
              </li>
              <li>
                <MdRequestPage />
                <Link to="/dashboard/regularization">Regularização de NFe</Link>
              </li>
            </StyledUl>
          </StyledList>
          <a onClick={() => logoutSAP()}>Alterar base</a>
        </ul>
      </StyledMenu>
      {backdropMenu && <StyledBackdrop></StyledBackdrop>}
    </>
  );
}

export default NavBar;
