import Input from "../ui/Input";
import { useState } from "react";
import Main from "../ui/Main";
import Button from "../ui/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InputSelectFile from "../ui/InputSelectFile";
import { createUser } from "../services/signup";
import { auth } from "../services/firebase";
import Spinner from "../ui/Spinner";
import { MAIL_REGEX, PASSWORD_REGEX, NAME_REGEX } from "../utils/regex";

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
const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  background-color: #ff000037;
`;
const initialState = {
  name: "",
  email: "",
  password: "",
  file: "",
};
function Login() {
  const [{ name, email, password, file }, setValues] = useState(initialState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validEmail = MAIL_REGEX.test(email.trim()) || email === "";
  const validPassword = PASSWORD_REGEX.test(password.trim()) || password === "";
  const validName = NAME_REGEX.test(name.trim()) || name === "";

  function handleChange(name, value) {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await createUser(auth, email, password);
    setError(response);
    setIsLoading(false);
  }
  return (
    <Main title={"Create a new account"}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Input
          label={"Enter your name"}
          id={"text"}
          type={"text"}
          name={"name"}
          autoComplete={"off"}
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={!validName ? "invalid" : ""}
        />
        <Input
          label={"Enter Your Email"}
          id={"email"}
          type={"email"}
          value={email}
          autoComplete={"new-email"}
          onChange={(e) => handleChange("email", e.target.value)}
          className={!validEmail ? "invalid" : ""}
        />
        <Input
          label={"Enter Your Password"}
          id={"password"}
          type={"password"}
          value={password}
          autoComplete={"new-password"}
          onChange={(e) => handleChange("password", e.target.value)}
          className={!validPassword ? "invalid" : ""}
        />
        <InputSelectFile />
        {error && (
          <ErrorMessage>something went wrong while signup</ErrorMessage>
        )}

        <PositionButton>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Signup"}
          </Button>
        </PositionButton>
      </form>
      <Account>
        <span>you already have an account? </span>
        <Register>
          {isLoading ? "loading..." : <Link to={"/login"}>Login</Link>}
        </Register>
      </Account>
    </Main>
  );
}

export default Login;
