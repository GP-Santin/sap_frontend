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
    if (error.response.data.error.status === 401) {
      toast.error("Sua sessão expirou, faça login novamente");
      window.location.href = "/login";
    } else {
      const { status, data } = error.response;

      if (status === 400) {
        switch (data.error.message.value) {
          case "540000009 - Specify the required date [OINV.ReqDate]":
            toast.error("Preencha a data necessária", {
              autoClose: false,
            });
            break;
          case '10000111 - On "Contents" tab, enter item or items':
            toast.error("Insira ao menos um item na solicitação", {
              autoClose: false,
            });
            break;
          case "Required date is missing (1)":
            toast.error("Preencha a data necessária", { autoClose: false });
            break;
          default:
            toast.error(data.error.message.value, { autoClose: false });
            break;
        }
      } else {
        toast.error(data.error.message.value, { autoClose: false });
      }
    }
    return Promise.reject(error);
  }
);

export default apiSAP;
