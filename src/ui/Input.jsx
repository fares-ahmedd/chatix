import styled from "styled-components";

const InputGroup = styled.div`
  position: relative;
  margin: 10px;
`;
const UserLabel = styled.label`
  position: absolute;
  left: 15px;
  color: #e8e8e8;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;
const InputElement = styled.input`
  border: solid 1.5px #9e9e9e;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1rem;
  color: #f5f5f5;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:focus,
  &:valid {
    outline: none;
    border: 1.5px solid #1a73e8;

    & ~ ${UserLabel} {
      transform: translateY(-50%) scale(0.8);
      background-color: white;
      padding: 0 0.2em;
      color: #2196f3;
    }
  }
`;

function Input() {
  return (
    <InputGroup>
      <InputElement required type="text" name="text" autoComplete="off" />
      <UserLabel>red</UserLabel>
    </InputGroup>
  );
}

export default Input;
