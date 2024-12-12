import Input from "../../ui/Input";
import { useEffect, useRef, useState } from "react";
import Main from "../../ui/Main";
import Button from "../../ui/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import InputSelectFile from "../../ui/InputSelectFile";
import Spinner from "../../ui/Spinner";
import useSignup from "./usePickedImage";
import { PASSWORD_REGEX } from "../../utils/regex";
import sendData from "../../services/sendData";
import { useAuth } from "../../context/AppDataContext";
import { usePickedImage } from "./useSignupStates";

const Account = styled.div`
  margin-top: 10px;
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
  margin: 10px auto;
  padding: 7px;
`;

const initialValues = {
  name: "",
  email: "",
  password: "",
  file: "",
};
const ContainerImg = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px auto;
  border-radius: 10px;
`;
function SignUp() {
  const [{ name, email, password, file }, setValues] = useState(initialValues);
  const { pickedImage, handleUploadImageChange } = usePickedImage(setValues);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const { setEditsValues, invalidEmail, invalidName, invalidPassword } =
    useSignup({ name, email, password });
  const navigate = useNavigate();
  const { currentUser, isLoading: isLogging } = useAuth();

  function isCompleteData() {
    return (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      invalidEmail ||
      invalidName ||
      invalidPassword ||
      PASSWORD_REGEX.test(password) === false
    );
  }

  // todo : handlers functions
  function handleChange(name, value) {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  }
  function handleBlur(name) {
    setEditsValues((prevValue) => ({ ...prevValue, [name]: true }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !name) return;
    sendData(email, password, name, file, setError, setIsLoading, navigate);
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef, isLoading]);

  useEffect(() => {
    if (currentUser?.accessToken && !isLogging) navigate("/");
  }, [navigate, isLogging, currentUser?.accessToken]);

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
          onBlur={() => handleBlur("isEditingName")}
          className={invalidName ? "invalid" : ""}
          refInput={inputRef}
          fullWidth
        />
        <Input
          label={"Enter Your Email"}
          id={"email"}
          type={"email"}
          value={email}
          autoComplete={"new-email"}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("isEditingEmail")}
          className={invalidEmail ? "invalid" : ""}
          fullWidth
        />
        <Input
          label={"Enter Your Password"}
          id={"password"}
          type={"password"}
          value={password}
          autoComplete={"new-password"}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("isEditingPassword")}
          className={invalidPassword ? "invalid" : ""}
          fullWidth
        />
        <InputSelectFile
          onChange={handleUploadImageChange}
          file={file}
          pickedImage={pickedImage}
        />
        {pickedImage && (
          <ContainerImg>
            <img
              src={pickedImage}
              alt="Picked Profile Img"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </ContainerImg>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={isLoading || isCompleteData()}>
          {isLoading ? <Spinner /> : "Signup"}
        </Button>
      </form>
      {!isLoading && (
        <Account>
          <span>you already have an account? </span>
          <Register>
            <Link to={"/login"}>Login</Link>
          </Register>
        </Account>
      )}
    </Main>
  );
}

export default SignUp;
