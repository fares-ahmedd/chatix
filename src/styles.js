import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root, :root.light-mode {
    --text-color-700: #374151
    --text-color-900: #5a6474
    --text-color-500: #1c283b
    --globalbackground: #e464
    --background: #fefe
    
  }

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Open Sans", sans-serif;
  color: var(--text-color-700);
  transition: color 0.3s, background-color 0.3s;
  line-height: 1.5;
  font-size: 1.6rem;

}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
  outline: none;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

/* scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #d4d4d4;
  border-radius: 6px;
  border: 2px solid #f5f5f5;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #bfbfbf;
}

::-webkit-scrollbar-thumb:active {
  background-color: #a9a9a9;
}
/* end scrollbar */

`;

export default GlobalStyles;
