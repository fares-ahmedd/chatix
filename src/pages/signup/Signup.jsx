import Input from "../../ui/Input";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Main from "../../ui/Main";
import Button from "../../ui/Button";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import InputSelectFile from "../../ui/InputSelectFile";
import Spinner from "../../ui/Spinner";
import useSignup from "./useSignup";
import { PASSWORD_REGEX } from "../../utils/regex";
import sendData from "../../services/sendData";
import { useAuth } from "../../context/AppDataContext";

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
  width: fit-content;
  margin: auto;
  padding: 7px;
  border-radius: 10px;
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
  margin: 5px auto;
  border-radius: 10px;
`;
function SignUp() {
  // todo : hooks
  const [{ name, email, password, file }, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [pickedImage, setPickedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const { setEditsValues, invalidEmail, invalidName, invalidPassword } =
    useSignup({ name, email, password });
  const navigate = useNavigate();
  const { currentUser, isLoading: isLogging } = useAuth();

  // todo : vars
  const isCompleteData =
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    invalidEmail ||
    invalidName ||
    invalidPassword ||
    PASSWORD_REGEX.test(password) === false;
  // todo : handlers functions
  function handleChange(name, value) {
    setValues((prevValue) => ({ ...prevValue, [name]: value }));
  }
  function handleBlur(name) {
    setEditsValues((prevValue) => ({ ...prevValue, [name]: true }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    sendData(email, password, name, file, setError, setIsLoading, navigate);
  }

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef, isLoading]);

  useLayoutEffect(() => {
    if (currentUser?.accessToken && !isLogging) navigate("/");
  }, [navigate, isLogging, currentUser?.accessToken]);

  const handleUploadImageChange = (e) => {
    const file = e.target.files[0];
    setValues((prevValue) => ({
      ...prevValue,
      file,
    }));

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

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

        <PositionButton>
          <Button type="submit" disabled={isLoading || isCompleteData}>
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

export default SignUp;
