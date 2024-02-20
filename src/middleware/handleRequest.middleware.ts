import axios from "axios";

export const apiSAP = axios.create({
  baseURL: import.meta.env.VITE_SAP_BASE_URL,
  withCredentials: true,
});

// apiSAP.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.data) {
//       if (error.response.data.error.message.value == "Login failed") {
//         toast.error("Você não tem acesso a essa base");
//       } else {
//         const { status, data } = error.response;
//         if (status === 400) {
//           switch (data.error.message.value) {
//             case "540000009 - Specify the required date [OINV.ReqDate]":
//               toast.error("Preencha a data da necessidade", {
//                 autoClose: false,
//               });
//               break;
//             case '10000111 - On "Contents" tab, enter item or items':
//               toast.error("Insira ao menos um item na solicitação", {
//                 autoClose: false,
//               });
//               break;
//             case "Required date is missing (1)":
//               toast.error("Preencha a data da necessidade", {
//                 autoClose: false,
//               });
//               break;
//             case "Invalid session or session already timeout.":
//               toast.error("Sua sessão expirou, faca login novamente", {
//                 autoClose: false,
//               });
//               const navigate = useNavigate();
//               navigate("/login");
//               break;
//             default:
//               toast.error(data.error.message.value, { autoClose: false });
//               break;
//           }
//         } else {
//           toast.error(data.error.message.value, { autoClose: false });
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default apiSAP;
