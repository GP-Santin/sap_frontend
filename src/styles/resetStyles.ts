import { createGlobalStyle } from "styled-components";

export const ResetStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
		font-family: var(--font-family-primary);
  }

  html{
  overflow-x: hidden;
  }

  body {
    line-height: 1;
    overflow-x: hidden;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;
  }

  a {
    color: unset;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  input {
    border-radius: 0;
    border: none;
    background: transparent;
  }

  img {
    max-width: 100%;
  }

   &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1300px) {
    width: 50vw;
    top: 14%;
  }
`;
