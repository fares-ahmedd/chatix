import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../ui/LoadingSpinner";

function ProtectedPage() {
  const { currentUser, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) return <Loader />;

  return (
    <>
      {currentUser ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
}
export default ProtectedPage;
