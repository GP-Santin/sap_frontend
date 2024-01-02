import { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesMain from "./routes/RoutesMain";
import { GlobalStyles } from "./styles/globalStyles";
import { ResetStyles } from "./styles/resetStyles";
import darkTheme from "./styles/themes/dark";
import lightTheme from "./styles/themes/light";
import { AppContext, AppProvider } from "./providers/AppContext/AppProviders";
import { UserProvider } from "./providers/UserContext/UserContext";

function App() {
  const { theme } = useContext(AppContext);

  useEffect(() => {}, [theme]);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <ResetStyles />
        <GlobalStyles />
        <AppProvider>
          <UserProvider>
            <RoutesMain />
          </UserProvider>
        </AppProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </ThemeProvider>
  );
}

export default App;
