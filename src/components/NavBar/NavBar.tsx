import { useState } from "react";
import { StyledBackdrop } from "./styles";
import { useOutsideClick } from "../../hooks/outsideClick";
import { Header } from "../Header/Header";
import { List } from "./components/List/List";

function NavBar({ toggleTheme, theme }: INavProps) {
  const [burguerClass, setBurguerClass] = useState("burguer-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [listActive, setListActive] = useState("list-unclicked");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [backdropMenu, setBackdropMenu] = useState(false);

  const closeMenu = () => {
    setBurguerClass("burguer-bar unclicked");
    setMenuClass("menu hidden");
    setBackdropMenu(false);
  };

  const toggleSection = (sectionId: string) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
      setListActive("list-unclicked");
    } else {
      setActiveSection(sectionId);
      setListActive("list-clicked");
    }
  };

  const dropdownRef = useOutsideClick({ callback: closeMenu });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Header
        burguerClass={burguerClass}
        setBurguerClass={setBurguerClass}
        setBackdropMenu={setBackdropMenu}
        setMenuClass={setMenuClass}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <List
        menuClass={menuClass}
        listActive={listActive}
        toggleSection={toggleSection}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
        activeSection={activeSection}
      />
      {backdropMenu && <StyledBackdrop />}
    </>
  );
}

export default NavBar;
