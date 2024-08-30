import { Outlet } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
