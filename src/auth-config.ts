import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "1e531b8f-47e5-4c51-b5ae-951b3787403e",
    authority:
      "https://login.microsoftonline.com/81a5961d-1cf6-41f7-8dc2-027022287f7d/v2.0",
    redirectUri: "https://sap-bha5xrq5v-grupo-santin.vercel.app/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
