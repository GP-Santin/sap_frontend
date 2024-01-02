import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      background: string;
      text: string;
      buttonBackground: string;
      buttonText: string;
      primary: string;
    };
  }
}
