import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);
  const token = sessionStorage.getItem("authToken");
  if (token != null && token != '' && user.roles.includes(role)) {
    return children;
  }
  if (!user.isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (role && user.roles && !user.roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
