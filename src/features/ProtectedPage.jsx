import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AppDataContext";
import Loader from "../ui/LoadingSpinner";

function ProtectedPage() {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  return <>{currentUser ? <Outlet /> : <Navigate to="/login" />}</>;
}
export default ProtectedPage;
