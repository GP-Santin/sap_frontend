import axios from "axios";

export const apiSAP = axios.create({
  baseURL: "https://saphagpsantinhom.skyinone.net:50000/b1s/v1",
  timeout: 8000,
});

export const apiSantin = axios.create({
  baseURL: "http://localhost:3000/v1",
  timeout: 8000,
});
