import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import RoutesMain from "./routes/RoutesMain";
import { GlobalStyles } from "./styles/globalStyles";
import { ResetStyles } from "./styles/resetStyles";
import { AppProvider } from "./providers/AppContext/AppProviders";
import { UserProvider } from "./providers/UserContext/UserContext";
import { darkTheme } from "./styles/themes/dark";
import { lightTheme } from "./styles/themes/light";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {}, [theme]);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ResetStyles />
      <GlobalStyles />
      <AppProvider>
        <UserProvider>
          <RoutesMain toggleTheme={toggleTheme} theme={theme} />
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
    </ThemeProvider>
  );
}

export default App;
