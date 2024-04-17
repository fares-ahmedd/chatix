import Input from "../ui/Input";
import { useState } from "react";
import Main from "../ui/Main";
import Button from "../ui/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

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
const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  background-color: #ff000037;
  width: 70%;
  margin: auto;
  padding: 7px;
`;
function Login() {
  const [{ email, password }, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function handleChange(target, value) {
    setValues((prevData) => ({ ...prevData, [target]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      navigate("/");
    } catch (_) {
      setError(true);
      setIsLoading(false);
    }
  }
  return (
    <Main title={"Please login to your account"}>
      <form onSubmit={handleSubmit}>
        <Input
          label={"Your Email"}
          id={"email"}
          autoComplete={"new-email"}
          name={"email"}
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label={"Your Password"}
          id={"password"}
          autoComplete={"new-password"}
          name={"password"}
          value={password}
          type={"password"}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {error && (
          <ErrorMessage>
            Please verify the email and password you entered and try again
          </ErrorMessage>
        )}

        <PositionButton>
          <Button type="submit">{isLoading ? <Spinner /> : "LOGIN"}</Button>
        </PositionButton>
      </form>
      <Account>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {" "}
            <span>you don't have an account? </span>
            <Register>
              <Link to={"/signup"}>Register</Link>
            </Register>
          </>
        )}
      </Account>
    </Main>
  );
}

export default Login;
