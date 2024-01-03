import sunIcon from "../../icons/sun.svg";
import moonIcon from "../../icons/moon.svg";
import { Icon } from "./styles";

function Theme({ toggleTheme, theme }: any) {
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
