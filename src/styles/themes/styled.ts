import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      background: string;
      primarytint: string;
      primarysoft: string;
      secondary: string;
    };
  }
}
