import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    &,
    &.light-mode {
      --text-color-700: #374151;
      --text-color-900: #5a6474;
      --text-color-500: #1c283b;
      --input-color-500: #1c283b;
      --global-background: #f9fafb;
      --global-background-500: #f0f2f5;
      --background: white;
    }

    &.dark-mode {
      --text-color-700: #fffcf9;
      --text-color-900: #cccfd3;
      --text-color-500: #adb5bd;
      --input-color-500: #f9fafb;
      --global-background: #2d2d2d;
      --global-background-500: #383f44;
      --background: #323333;
    }

    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-300: #2d959e;
    --color-brand-500: #6fdfe9;
    --color-brand-700: #2bebfc;
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

  a {
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
    background-color: var(--global-background-500);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--text-color-500);
    border-radius: 6px;
    border: 2px solid var(--global-background);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-color-700);
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: var(--text-color-900);
  }
  /* end scrollbar */
  input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff0000"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>') no-repeat center;
  background-size: 1em;
  height: 1.2em;
  width: 1.2em;
  opacity: 0.5;
}

input[type="search"]::-webkit-search-cancel-button:hover,
input[type="search"]:focus::-webkit-search-cancel-button {
  opacity: 1;
}
`;

export default GlobalStyles;
