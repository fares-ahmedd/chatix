import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { auth } from "../services/firebase";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const idRef = useRef();
  const selectedUser = useRef();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);
  console.log(currentUser);
  const values = {
    currentUser,
    isLoading,
    setIsOpen,
    isOpen,
    setIsSelected,
    isSelected,
    idRef,
    selectedUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth was used out side the AuthContextProvider");

  return context;
}

export { useAuth, AuthContextProvider };
