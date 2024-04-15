import styled from "styled-components";
import Input from "../ui/Input";

function Signup() {
  return (
    <>
      <MyP>Sign Up</MyP>
      <Input />
      <Input />
    </>
  );
}

export default Signup;

const MyP = styled.p`
  color: var(--globalbackground);
  font-size: 50px;
`;
