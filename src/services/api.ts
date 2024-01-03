import axios from "axios";

export const apiSAP = axios.create({
  baseURL: "https://138.2.241.213:50000/b1s/v1",
  withCredentials: true,
});

export const apiSantin = axios.create({
  baseURL: "http://localhost:3000/v1",
  timeout: 8000,
});
