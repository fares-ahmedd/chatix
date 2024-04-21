import styled, { css } from "styled-components";

const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
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
  padding: 5px 5px 5px 15px;
  display: block;
  border-radius: 10px;
  border: 1px solid var(--text-color-900);
  width: 100%;

  &.invalid {
    background-color: #da161686;
    border: 1px solid red;
  }
  &:focus {
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

  ${(props) =>
    props.className === "shrink" &&
    css`
      ${shrinkLabel}
    `}
`;

const Input = ({ label, id, fullWidth, autoComplete, ...otherProps }) => {
  return (
    <Group className={fullWidth ? "fullWidth" : ""}>
      <FormInputField id={id} autoComplete={autoComplete} {...otherProps} />
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
