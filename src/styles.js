import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    &, &.light-mode {
    --text-color-700: #374151;
    --text-color-900: #5a6474;
    --text-color-500: #1c283b;
    --global-background: #F9FAFB;
    --global-background-500: #F0F2F5;
    --background: white;
    
  }
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-300: #2d959e;
  --color-brand-500: #6fdfe9;
  --color-brand-700: #2BEBFC;
  --color-brand-900: #0cdef0;

  --border-color: #e0e1e3;
} 

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
}

html {
  font-size: 62.5%;
}
a{
  text-decoration: none;
  color: var(--color-brand-300);
  transition: 0.3s;
}
a:hover {
  color: var(--color-brand-500);

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
