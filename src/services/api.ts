import axios from "axios";

export const api = axios.create({
  baseURL: "https://saphagpsantinhom.skyinone.net:50000/b1s/v1",
  timeout: 8000,
});
