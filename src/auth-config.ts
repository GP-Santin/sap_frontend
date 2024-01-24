import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT,
    authority: import.meta.env.VITE_AUTHORITY,
    // redirectUri: "https://ti-gruposantin.com.br/",
    redirectUri: "https://localhost:5173/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
