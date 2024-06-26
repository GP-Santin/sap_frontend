import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: "https://ti-gruposantin.com.br/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  scopes: ["User.Read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);
