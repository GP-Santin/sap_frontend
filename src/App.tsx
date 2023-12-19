import { ThemeProvider } from "styled-components";
import { useState } from "react";
import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import { ResetStyles } from "./styles/resetStyles";
import { GlobalStyles } from "./styles/globalStyles";
import { UserProvider } from "./providers/UserContext";
import RoutesMain from "./routes/RoutesMain";

function App() {
  const [currentTheme] = useState(localStorage.getItem("@theme"));
  const theme = currentTheme === "Escuro" ? dark : light;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ResetStyles />
        <GlobalStyles />
        {/* <UserProvider> */}
          <RoutesMain />
        {/* </UserProvider> */}
      </ThemeProvider>
    </>
  );
}

export default App;
