import { InputHTMLAttributes, ReactElement } from "react";
import { FieldError } from "react-hook-form";
import styled, { css } from "styled-components";
import { widthsizeType } from "../Button/styles";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  widthsize: widthsizeType;
  label?: string;
  error?: FieldError;
  span?: string;
  icon?: ReactElement;
}

export const InputStyled = styled.input<IInputProps>`
  width: 100%;
  height: 3rem;
  position: relative;

  color: ${(props) => props.theme.colors.primarytint};
  border: 2px solid var(--color-primary);
  border-radius: 0.5rem;

  padding: 1rem 2rem 1rem 1rem;

  outline: none;

  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-1);
  font-size: var(--font-size-1);

  ${({ widthsize }) => {
    switch (widthsize) {
      case "small":
        return css`
          width: 5.3125rem;
          height: 3rem;
        `;
      case "small2":
        return css`
          width: 8.4375rem;
          height: 3rem;
        `;
      case "med":
        return css`
          width: 9.6875rem;
          height: 3rem;
        `;
      case "med2":
        return css`
          width: 11.5625rem;
          height: 3rem;
          min-width: 11.5625rem;
        `;
      case "large1":
        return css`
          width: 13.125rem;
          height: 2.8125rem;
          height: 3rem;
        `;
      case "large2":
        return css`
          width: 15rem;
          height: 3rem;
        `;
      case "large3":
        return css`
          width: 100%;
          max-width: 1024px;
          height: 3rem;
        `;
      default:
        return css`
          width: 100%;
        `;
    }
  }}
`;

export const ContainerInputSyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  label {
    color: ${(props) => props.theme.colors.primarytint};
    width: auto;
  }
`;
