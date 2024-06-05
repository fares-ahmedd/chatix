import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
const initialState = {
  email: "",
  password: "",
};
function useLogin() {
  const [{ email, password }, setValues] = useState(initialState);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  function handleChange(target, value) {
    setValues((prevData) => ({ ...prevData, [target]: value }));
    setError(false);
  }
  async function handleLogin(e) {
    e.preventDefault();
    const hasUppercaseLetters = /[A-Z]/.test(email);

    try {
      setIsLoading(true);
      if (!email || !password) {
        setError(undefined);
        if (!email) return emailInputRef?.current.focus();
        if (!password) return passwordInputRef?.current.focus();
      }
      if (hasUppercaseLetters) {
        setError(true);
        setValues(initialState);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (_) {
      emailInputRef?.current.focus();
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    error,
    isLoading,
    email,
    password,
    handleChange,
    handleLogin,
    emailInputRef,
    passwordInputRef,
  };
}

export default useLogin;
