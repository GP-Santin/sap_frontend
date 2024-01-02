import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { useContext } from "react";
import { AppContext } from "../../providers/AppContext/AppProviders";
import { Icon } from "./styles";

function Theme() {
  const { theme, toggleTheme } = useContext(AppContext);

  if (!theme) return null;

  return (
    <Icon
      src={theme === "light" ? moonIcon : sunIcon}
      alt=""
      onClick={toggleTheme}
      width={25}
    />
  );
}
export default Theme;
