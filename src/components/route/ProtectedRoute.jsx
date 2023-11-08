import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { isConnected } from "../../core/selectors";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(isConnected)
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};