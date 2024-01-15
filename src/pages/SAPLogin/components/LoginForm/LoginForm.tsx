import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TLoginForm } from "./schema";
import { StyledContainerSelect, StyledForm, StyledSelect } from "./styles";
import { Button } from "../../../../components/Button/Button";
import { useContext } from "react";
import { AppContext } from "../../../../providers/AppContext/AppProviders";

export const LoginForm = () => {
  const { appLogin, loading } = useContext(AppContext);
  const theme = localStorage.getItem("theme");
  const { register, handleSubmit } = useForm<TLoginForm>({});

  const submit: SubmitHandler<FieldValues> = async (formData) => {
    const loginFormData: TLoginForm = {
      UserName: import.meta.env.VITE_SAP_LOGIN,
      Password: import.meta.env.VITE_SAP_PASSWORD,
      CompanyDB: formData.CompanyDB,
    };
    appLogin(loginFormData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <StyledContainerSelect>
        <label htmlFor="companyDB">Base</label>
        <StyledSelect {...register("CompanyDB")}>
          <option
            style={{
              background: theme === "light" ? "#FFFFFF" : "#101119",
            }}
            value="SBOPRODCAL"
          >
            Caldebras
          </option>
          <option
            style={{
              background: theme === "light" ? "#FFFFFF" : "#101119",
            }}
            value="SBOPRODPIR"
          >
            Pirâmide
          </option>
          <option
            style={{
              background: theme === "light" ? "#FFFFFF" : "#101119",
            }}
            value="SBOPRODSCR"
          >
            Santin Crane
          </option>
          <option
            style={{
              background: theme === "light" ? "#FFFFFF" : "#101119",
            }}
            value="SBOPRODGUI"
          >
            Santin Equipamentos
          </option>
          <option
            style={{
              background: theme === "light" ? "#FFFFFF" : "#101119",
            }}
            value="SBOPRODTRA"
          >
            SETE - Transportes{" "}
          </option>
          <option
            style={{
              background: theme === "light" ? "#FFFFFF" : "#101119",
            }}
            value="SBOPRODTRE"
          >
            TRES - Transportes{" "}
          </option>
        </StyledSelect>
      </StyledContainerSelect>
      <Button
        type="submit"
        name={loading ? "Entrando..." : "Entrar"}
        color="outline-black"
        widthsize="med2"
      />
    </StyledForm>
  );
};

export default LoginForm;
