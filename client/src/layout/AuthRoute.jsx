import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { currentUser } from "../redux/userSlice";

const AuthRoute = () => {
  const user = useSelector(currentUser);
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AuthRoute;
