import Input from "../ui/Input";
import { useState } from "react";
import Main from "../ui/Main";
import Button from "../ui/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InputSelectFile from "../ui/InputSelectFile";
import { createUser } from "../services/signup";
import { auth } from "../services/firebase";

const PositionButton = styled.div`
  margin: 5px auto;
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
const initialState = {
  name: "",
  email: "",
  password: "",
  file: "",
};
function Login() {
  const [{ name, email, password, file }, setValues] = useState(initialState);
  function handleChange(name, value) {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
    console.log(value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    createUser(auth, email, password);
  }
  return (
    <Main title={"Create a new account"}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input
          label={"Enter your name"}
          id={"text"}
          type={"text"}
          name={"name"}
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          label={"Enter Your Email"}
          id={"email"}
          type={"email"}
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label={"Enter Your Password"}
          id={"password"}
          type={"password"}
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <InputSelectFile />
        <PositionButton>
          <Button type="submit">Sign up</Button>
        </PositionButton>
      </form>
      <Account>
        <span>you already have an account? </span>
        <Register>
          <Link to={"/login"}>Login</Link>
        </Register>
      </Account>
    </Main>
  );
}

export default Login;
