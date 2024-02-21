import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import RoutesMain from "./routes/RoutesMain";
import { GlobalStyles } from "./styles/globalStyles";
import { ResetStyles } from "./styles/resetStyles";
import { AppContext, AppProvider } from "./providers/AppContext/AppProviders";
import { UserProvider } from "./providers/UserContext/UserContext";
import { darkTheme } from "./styles/themes/dark";
import { lightTheme } from "./styles/themes/light";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import SessionTimer from "./sessionManagement/SessionTimer";
import CookieConsent from "react-cookie-consent";
import { ErrorBoundary } from "react-error-boundary";
import { AppStyled, LoaderWrapper } from "./styles/app";
import CircleLoader from "react-spinners/CircleLoader";

Modal.setAppElement("#root");
function App() {
  const { loading } = useContext(AppContext);
  const [color] = useState("#214966");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("@theme", newTheme);
  };

  useEffect(() => {}, [theme]);

  return (
    <AppStyled>
      {loading ? (
        <LoaderWrapper>
          <CircleLoader color={color} size={75} />
        </LoaderWrapper>
      ) : (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <ResetStyles />
          <GlobalStyles />
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <AppProvider>
              <UserProvider>
                <RoutesMain theme={theme} toggleTheme={toggleTheme} />
              </UserProvider>
            </AppProvider>
          </ErrorBoundary>

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
          <SessionTimer />
          <CookieConsent
            location="bottom"
            buttonText="Aceitar"
            cookieName="cookieConsent"
            style={{ background: "#2B373B" }}
            buttonStyle={{
              backgroundColor: "#FFFF",
              color: "#2B373B",
              fontSize: "13px",
            }}
            expires={150}
          >
            Nosso site utiliza cookies para armazenar dados essenciais para o
            funcionamento.{" "}
          </CookieConsent>
        </ThemeProvider>
      )}
    </AppStyled>
  );
}

export default App;
