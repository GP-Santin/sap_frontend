import axios from "axios";
import { toast } from "react-toastify";

export const apiSAP = axios.create({
  baseURL: "https://138.2.241.213:50000/b1s/v1",
  withCredentials: true,
});

apiSAP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    const { status, response } = error.response;
    if (
      status === 400 &&
      response.data.error.message ===
        "540000009 - Specify the required date [OINV.ReqDate]"
    ) {
      return toast.error("Preencha todos os campos necessários");
    }
    if (
      status === 400 &&
      response.data.error.message ===
        '10000111 - On "Contents" tab, enter item or items'
    ) {
      return toast.error("Insira ao menos um item a solicitação");
    }

    return Promise.reject(error);
  }
);

export default apiSAP;
