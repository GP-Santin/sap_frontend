import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SAP_BASE_URL,
  timeout: 8000,
});
