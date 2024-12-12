import Input from "../../ui/Input";
import Main from "../../ui/Main";
import Button from "../../ui/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { isInvalidInput } from "../../utils/helpers";
import useLogin from "./useLogin";
import { useAuth } from "../../context/AppDataContext";
import Loader from "../../ui/LoadingSpinner";
import { useEffect } from "react";

const Account = styled.div`
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  background-color: #ff000037;
  margin: auto;
  padding: 7px;
  border-radius: 5px;
  border-right: 5px solid red;
  margin-bottom: 10px;
`;
function Login() {
  const {
    error,
    isLoading,
    email,
    password,
    handleChange,
    handleLogin,
    passwordInputRef,
    emailInputRef,
  } = useLogin();
  const { currentUser, isLoading: isLogging } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.accessToken && !isLogging) navigate("/");
  }, [navigate, isLogging, currentUser?.accessToken]);

  useEffect(() => {
    if (emailInputRef.current) emailInputRef.current.focus();
  }, [emailInputRef, isLogging]);

  if (isLogging) return <Loader />;
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
          refInput={emailInputRef}
          fullWidth={true}
          required
        />
        <Input
          label={"Your Password"}
          autoComplete={"new-password"}
          name={"password"}
          value={password}
          type={"password"}
          onChange={(e) => handleChange("password", e.target.value)}
          className={isInvalidInput(error)}
          refInput={passwordInputRef}
          fullWidth={true}
          required
        />
        {error && (
          <ErrorMessage>
            wrong password or email , Please verify the email and password you
            entered and try again
          </ErrorMessage>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "LOGIN"}
        </Button>
      </form>

      <Account>
        {!isLoading && (
          <>
            <span>you don't have an account? </span>
            <Link to={"/signup"}>Register</Link>
          </>
        )}
      </Account>
    </Main>
  );
}

export default Login;
