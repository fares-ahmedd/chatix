import Input from "../ui/Input";
import { useState } from "react";
import Main from "../ui/Main";
import Button from "../ui/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PositionButton = styled.div`
  margin: 15px auto;
  width: 70%;
  text-align: center;
`;
const Account = styled.div`
  font-weight: 700;
  text-align: center;
`;
const Register = styled.span`
  color: var(--color-brand-300);
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: var(--color-brand-500);
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  function handleChange(e) {
    setEmail(e.target.value);
  }
  return (
    <Main title={"Please login to your account"}>
      <form>
        <Input
          label={"Your Email"}
          id={"email"}
          value={email}
          onChange={handleChange}
        />
        <Input label={"Your Password"} id={"password"} />
        <PositionButton>
          <Button type="button">Login</Button>
        </PositionButton>
      </form>
      <Account>
        <span>you don't have an account? </span>
        <Register>
          <Link to={"/signup"}>Register</Link>
        </Register>
      </Account>
    </Main>
  );
}

export default Login;
