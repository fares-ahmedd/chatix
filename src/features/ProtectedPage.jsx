import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";

function ProtectedPage({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return <>{currentUser ? children : <Spinner />}</>;
}

export default ProtectedPage;
