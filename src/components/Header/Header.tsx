import { useState } from "react";
import {
  StyledHeader,
  BurguerStyled,
  StyledIconContainer,
  Icon,
} from "../NavBar/styles";
import { useMsal } from "@azure/msal-react";
import moonIcon from "../../icons/moon.svg";
import sunIcon from "../../icons/sun.svg";

type HeaderProps = {
  setBurguerClass: React.Dispatch<React.SetStateAction<string>>;
  burguerClass: string;
  setMenuClass: React.Dispatch<React.SetStateAction<string>>;
  setBackdropMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  theme: string;
};

export const Header = ({
  setBurguerClass,
  burguerClass,
  setMenuClass,
  setBackdropMenu,
  toggleTheme,
  theme,
}: HeaderProps) => {
  const { instance } = useMsal();
  const activeUser = instance.getAllAccounts()[0];
  const [isMenuClicked, setIsMenuClicked] = useState(false);

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

  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};
