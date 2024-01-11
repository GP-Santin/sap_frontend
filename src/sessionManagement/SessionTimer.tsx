import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        navigate("/login");
      }, 30 * 60 * 1000);
    };

    const onUserActivity = () => {
      resetTimer();
    };

    window.addEventListener("mousemove", onUserActivity);
    window.addEventListener("keydown", onUserActivity);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keydown", onUserActivity);
      clearTimeout(logoutTimer);
    };
  }, [navigate]);

  return null;
};

export default SessionTimer;
