import styled, { css } from "styled-components";

const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
  color: var(--text-color-900); // Ensure sufficient contrast
`;

const Group = styled.div`
  position: relative;
  margin: 15px auto;
  ${(props) =>
    props.className === "fullWidth"
      ? css`
          width: 100%;
        `
      : css`
          width: 70%;
        `}
`;

const FormInputField = styled.input`
  background: none;
  background-color: var(--global-background);
  color: var(--input-color-500);
  font-weight: bold;
  padding: 10px 5px 10px 15px; // Increased vertical padding for better touch targets
  display: block;
  border-radius: 10px;
  border: 1px solid var(--text-color-900);
  width: 100%;

  &.invalid {
    background-color: #da161686;
    border: 1px solid red;
  }
  &:focus {
    outline: 2px solid var(--text-color-900); // Visible focus outline

    outline: none;

    & ~ label {
      ${shrinkLabel}
    }
  }

  &[type="password"] {
    letter-spacing: 0.3em;
  }
`;

const FormInputLabel = styled.label`
  color: var(--text-color-900);
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 10px;
  transition: 300ms ease all;
  background-color: var(--global-background);
  padding: 2px 10px;
  border-radius: 6px;

  ${(props) =>
    props.className === "shrink" &&
    css`
      ${shrinkLabel}
    `}
`;

const Input = ({
  label,
  id,
  fullWidth,
  autoComplete,
  refInput,
  ...otherProps
}) => {
  return (
    <Group className={fullWidth ? "fullWidth" : ""}>
      <FormInputField
        id={id}
        autoComplete={autoComplete}
        ref={refInput}
        aria-label={label}
        {...otherProps}
      />
      {label && (
        <FormInputLabel
          htmlFor={id}
          className={otherProps.value?.length > 0 ? "shrink" : ""}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default Input;
