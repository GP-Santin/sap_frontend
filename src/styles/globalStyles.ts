import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
		--color-primary: #214966;
    --color-denim: #78c7ff;
    --color-black: #101119;
		--color-black-2: #0f1411;
		--color-black-text: #00000080;
    --color-white: #FFFFFF;
    --color-light-gray: #F5F5F5;
		--color-gray: #484f58;
		--color-hover: #333333;
		--color-border: #EBEBED;

		--color-alert: #FF0000;

    --font-family-primary: "Montserrat", sans-serif;
    --font-family-secondary: "Roboto", sans-serif;

		--font-size-1: 0.875rem;
		--font-size-2: 1rem;
		--font-size-3: 1.125rem;
		--font-size-4: 1.3125rem;
		--font-size-5: 1.75rem;
		--font-size-6: 2.25rem;
		--font-size-7: 2.75rem;
		--font-size-8: 4rem;

		--font-weight-1: 400;
		--font-weight-2: 700;
  }
`;
