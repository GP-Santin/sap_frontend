import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
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
  scopes: ["User.Read"],
};


export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const msalInstance = new PublicClientApplication(msalConfig);
