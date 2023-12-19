import { useMsal } from "@azure/msal-react";

function HomePage({}: HomePageProps) {
  const { instance } = useMsal();
  return (
    <div>
      <nav></nav>
    </div>
  );
}

export default HomePage;
