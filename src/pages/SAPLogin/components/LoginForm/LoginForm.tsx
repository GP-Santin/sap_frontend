import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TLoginForm } from "./schema";
import {
  StyledContainer,
  StyledContainerFields,
  StyledForm,
  StyledSelect,
} from "./styles";
import { Button } from "../../../../components/Button/Button";
import { ContainerInputSyled } from "../../../../components/Input/styles";
import { useContext, useState } from "react";
import { AppContext } from "../../../../providers/AppContext/AppProviders";

export const LoginForm = () => {
  const { appLogin, loading } = useContext(AppContext);
  const theme = localStorage.getItem("theme");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({});
  const [selectedOption, setSelectedOption] = useState("");

  const submit: SubmitHandler<FieldValues> = async (formData) => {
    const loginFormData: TLoginForm = {
      UserName: import.meta.env.VITE_SAP_LOGIN,
      Password: import.meta.env.VITE_SAP_PASSWORD,
      CompanyDB: formData.CompanyDB || selectedOption,
    };

    appLogin(loginFormData);
    reset();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledContainerFields>
          <ContainerInputSyled>
            <label htmlFor="companyDB">Base</label>
            <StyledSelect
              {...register("CompanyDB")}
              onChange={handleSelectChange}
            >
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
          </ContainerInputSyled>
          {errors.CompanyDB ? <span>{errors.CompanyDB.message}</span> : null}
          {/* Other form fields */}
        </StyledContainerFields>
        <Button
          type="submit"
          name={loading ? "Entrando..." : "Entrar"}
          color="outline-black"
          widthsize="med2"
        />
      </StyledForm>
    </StyledContainer>
  );
};

export default LoginForm;
