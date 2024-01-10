import axios from "axios";

export const apiSantin = axios.create({
  baseURL: "http://localhost:3000/v1",
  timeout: 8000,
});


