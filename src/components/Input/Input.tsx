import { ForwardedRef, forwardRef } from "react";
import { ContainerInputSyled, IInputProps, InputStyled, StyledCurrency } from "../Input/styles";

export const Input = forwardRef(
  (
    { span, widthsize, label, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <ContainerInputSyled>
        {label ? <label htmlFor={rest.name}>{label}</label> : null}
        <InputStyled
          id={rest.name}
          widthsize={widthsize}
          name={rest.name}
          ref={ref}
          type="text"
          {...rest}
        />
        {span ? <StyledCurrency>{span}</StyledCurrency> : null}
        {error ? <p>{error.message}</p> : null}
      </ContainerInputSyled>
    );
  }
);
