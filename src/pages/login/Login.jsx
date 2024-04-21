import Input from "../../ui/Input";
import Main from "../../ui/Main";
import Button from "../../ui/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { isInvalidInput } from "../../utils/helpers";
import useLogin from "./useLogin";

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
  border-radius: 5px;
`;
function Login() {
  const { error, isLoading, email, password, handleChange, handleLogin } =
    useLogin();
  return (
    <Main title={"Please login to your account"}>
      <form onSubmit={handleLogin}>
        <Input
          label={"Your Email"}
          autoComplete={"new-email"}
          name={"email"}
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={isInvalidInput(error)}
        />
        <Input
          label={"Your Password"}
          autoComplete={"new-password"}
          name={"password"}
          value={password}
          type={"password"}
          onChange={(e) => handleChange("password", e.target.value)}
          className={isInvalidInput(error)}
        />
        {error && (
          <ErrorMessage>
            Please verify the email and password you entered and try again
          </ErrorMessage>
        )}

        <PositionButton>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "LOGIN"}
          </Button>
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
