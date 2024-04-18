import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import Loader from "../ui/LoadingSpinner";

function ProtectedPage({ children }) {
  const { user, isLoading } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);
  if (isLoading) return <Loader />;

  return <>{children}</>;
}

export default ProtectedPage;
