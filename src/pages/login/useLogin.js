import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
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
        return;
      }
      if (hasUppercaseLetters) {
        setError(true);
        setValues(initialState);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (_) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return { error, isLoading, email, password, handleChange, handleLogin };
}

export default useLogin;
