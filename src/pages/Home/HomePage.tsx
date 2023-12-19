import { useMsal } from "@azure/msal-react";

function HomePage() {

  const {instance} = useMsal();
  return (
    <div>
      <h3>Home</h3>
      <button onClick={() => instance.logoutPopup()}>
        Logout
      </button>
    </div>
  );
}

export default HomePage;
