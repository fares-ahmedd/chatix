import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { auth } from "../services/firebase";

const AuthContext = createContext();

const initialState = {
  currentUser: null,
  isOpen: true,
  isSelected: localStorage.getItem("combinedId") !== null || undefined,
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "auth/setCurrentUser":
      return { ...state, currentUser: action.payload };
    case "loaded":
      return { ...state, isLoading: false };
    case "isOpen/logout":
      return { ...state, isOpen: false, isSelected: false };
    case "isOpen/toggle":
      return { ...state, isOpen: !state.isOpen };
    case "isSelected":
      return { ...state, isOpen: false, isSelected: true };
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [{ currentUser, isOpen, isSelected, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const idRef = useRef(localStorage.getItem("combinedId")?.split('"').join(""));
  const selectedUser = useRef(JSON.parse(localStorage.getItem("last-talk")));
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "auth/setCurrentUser", payload: user });
      dispatch({ type: "loaded" });
    });
    return () => {
      unsub();
    };
  }, []);
  const values = {
    currentUser,
    isLoading,
    dispatch,
    isOpen,
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
