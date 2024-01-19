import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TLoginForm } from "./schema";
import { StyledContainerSelect, StyledForm, StyledSelect } from "./styles";
import { Button } from "../../../../components/Button/Button";
import { useContext } from "react";
import { AppContext } from "../../../../providers/AppContext/AppProviders";

export const LoginForm = () => {
  const { appLogin, loading } = useContext(AppContext);
  const theme = sessionStorage.getItem("theme");
  const { register, handleSubmit } = useForm<TLoginForm>({});

  const submit: SubmitHandler<FieldValues> = async (formData) => {
    const loginFormData: TLoginForm = {
      // UserName: import.meta.env.VITE_SAP_LOGIN,
      // Password: import.meta.env.VITE_SAP_PASSWORD
      UserName: "PTL001",
      Password: "Fs8989@@",
      CompanyDB: formData.CompanyDB,
    };
    appLogin(loginFormData);
  };

  const styleTheme: React.CSSProperties | undefined = {
    background: theme === "light" ? "#FFFFFF" : "#161616",
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <StyledContainerSelect>
        <label htmlFor="companyDB">Base</label>
        <StyledSelect {...register("CompanyDB")}>
          <option style={{}} value="SBOPRODCAL">
            Caldebras
          </option>
          <option style={styleTheme} value="SBOPRODPIR">
            Pirâmide
          </option>
          <option style={styleTheme} value="SBOPRODSCR">
            Santin Crane
          </option>
          <option style={styleTheme} value="SBOPRODGUI">
            Santin Equipamentos
          </option>
          <option style={styleTheme} value="SBOPRODTRA">
            SETE - Transportes
          </option>
          <option style={styleTheme} value="SBOPRODTRE">
            TRES - Transportes
          </option>
        </StyledSelect>
      </StyledContainerSelect>
      <Button
        type="submit"
        name={loading ? "Entrando..." : "Entrar"}
        color="outline-black"
        widthsize="med2"
        style={{ marginTop: "5rem" }}
      />
    </StyledForm>
  );
};

export default LoginForm;
