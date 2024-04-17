import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedPage({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  if (!currentUser) {
    navigate("/login");
    return;
  }
  return <>{children}</>;
}

export default ProtectedPage;
