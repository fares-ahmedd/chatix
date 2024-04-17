import Input from "../ui/Input";
import { useState } from "react";
import Main from "../ui/Main";
import Button from "../ui/Button";
import styled from "styled-components";
import { Link, redirect, useNavigate } from "react-router-dom";
import InputSelectFile from "../ui/InputSelectFile";
import { createUser } from "../services/createUser";
import { auth, db, storage } from "../services/firebase";
import Spinner from "../ui/Spinner";
import useSignup from "./useSignup";
import { PASSWORD_REGEX } from "../utils/regex";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

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
`;
const initialValues = {
  name: "",
  email: "",
  password: "",
  file: "",
};
function Login() {
  // todo : hooks
  const [{ name, email, password, file }, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setEditsValues, invalidEmail, invalidName, invalidPassword } =
    useSignup({ name, email, password });
  const navigate = useNavigate();
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
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await createUser(auth, email, password);
      if (!response)
        throw new Error(
          "something went wrong, maybe your email is already exist"
        );
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress or other events if needed
        },
        (error) => {
          setError(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(response.user, {
            name,
            photoURL: downloadURL,
          });
          const useData = {
            uid: response.user.uid,
            name,
            email,
            photoURL: downloadURL,
          };
          await setDoc(doc(db, "users", response.user.uid), useData);
          await setDoc(doc(db, "userChats", response.user.uid), {});
          // await updateDoc(doc(db, "users", response.user.uid, useData));
          navigate("/");
          setIsLoading(false);
        }
      );
      setError("");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
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
          onBlur={() => handleBlur("isEditingName")}
          className={invalidName ? "invalid" : ""}
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
        />
        <InputSelectFile
          onChange={(e) =>
            setValues((prevValue) => ({
              ...prevValue,
              file: e.target.files[0],
            }))
          }
        />
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

export default Login;
