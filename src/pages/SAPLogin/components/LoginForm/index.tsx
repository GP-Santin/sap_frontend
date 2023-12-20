import { SubmitHandler, useForm } from "react-hook-form";
import { TLoginForm } from "./schema";
import { Input } from "../../../../components/Input/Input";
import {
  StyledContainer,
  StyledContainerFields,
  StyledForm,
  StyledSelect,
} from "./styles";
import { Button } from "../../../../components/Button";
import { ContainerInputSyled } from "../../../../components/Input/styles";
import { useContext } from "react";
import { AppContext } from "../../../../providers/AppContext/AppProviders";

export const LoginForm = ({ theme }: LoginPageProps) => {
  const { userLogin } = useContext(AppContext);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({});

  const submit: SubmitHandler<TLoginForm> = async (formData) => {
    userLogin(formData);
    reset();
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledContainerFields>
          <ContainerInputSyled>
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
          </ContainerInputSyled>
          {errors.CompanyDB ? <span>{errors.CompanyDB.message}</span> : null}
          <Input
            type="text"
            placeholder="Login"
            {...register("UserName")}
            label="Usuário"
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
          />
          {errors.UserName ? <span>{errors.UserName.message}</span> : null}
          <Input
            type="password"
            placeholder="Senha"
            {...register("Password")}
            label="Senha"
          />
          {errors.Password ? <span>{errors.Password.message}</span> : null}
        </StyledContainerFields>
        <Button
          type="submit"
          name="cadastre-se"
          color="outline-black"
          widthsize="med2"
          onClick={() => submit}
        />
      </StyledForm>
    </StyledContainer>
  );
};
