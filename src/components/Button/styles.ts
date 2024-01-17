import { styled, css } from "styled-components";

export type ColorType =
  | "solid-green"
  | "solid-black"
  | "outline-black"
  | "outline-white";

export type widthsizeType =
  | "small"
  | "small2"
  | "med"
  | "med2"
  | "large1"
  | "large2"
  | "large3";

interface IButtonStylesProps {
  color: ColorType;
  widthsize: widthsizeType;
}

export const ButtonStyles = css<IButtonStylesProps>`
  ${({ color }) => {
    switch (color) {
      case "solid-green":
        return css`
          color: var(--color-gray);
          border: 0.0761rem solid var(--color-primary);
        `;
      case "solid-black":
        return css`
          color: var(--color-black);
          border: 0.0761rem solid var(--color-primary);
        `;
      case "outline-black":
        return css`
          background-color: {(props) => props.theme.colors.background};
          border: 0.0761rem solid var(--color-primary);
        `;
      case "outline-white":
        return css`
          background-color: {(props) => props.theme.colors.background};
          border: 0.0761rem solid var(--color-primary);
        `;
    }
  }}

  ${({ widthsize }) => {
    switch (widthsize) {
      case "small":
        return css`
          width: 5.3125rem;
        `;
      case "small2":
        return css`
          width: 8.4375rem;
        `;
      case "med":
        return css`
          width: 9.6875rem;
        `;
      case "med2":
        return css`
          width: 11.5625rem;
        `;
      case "large1":
        return css`
          width: 13.125rem;
          height: 2.8125rem;
        `;
      case "large2":
        return css`
          width: 15rem;
        `;
    }
  }}
`;

export const StyledButton = styled.button<IButtonStylesProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 15.9375rem;
  height: 3.4375rem;
  font-size: 1rem;

  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-2);
  color: ${(props) => props.theme.colors.primarytint};

  ${ButtonStyles};

  &:hover {
    transform: translateY(10);
    background-color: var(--color-primary);
    color: #ffffff;
    transition: 0.15s;
  }
`;
