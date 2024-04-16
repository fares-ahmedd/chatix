import styled, { css } from "styled-components";

const shrinkLabel = css`
  top: -14px;
  font-size: 12px;
`;

const Group = styled.div`
  position: relative;
  margin: 15px auto;
  width: 70%;
`;

const FormInputField = styled.input`
  background: none;
  background-color: white;
  color: var(--text-color-500);
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  display: block;
  border-radius: 10px;
  border: 1px solid var(--text-color-900);
  width: 100%;

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
    props.shrink &&
    css`
      ${shrinkLabel}
    `}
`;

const Input = ({ label, id, ...otherProps }) => {
  return (
    <Group>
      <FormInputField id={id} autoComplete="off" {...otherProps} />
      {label && (
        <FormInputLabel htmlFor={id} shrink={otherProps.value?.length > 0}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default Input;
