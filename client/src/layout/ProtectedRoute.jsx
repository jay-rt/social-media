import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { currentUser } from "../redux/userSlice";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const user = useSelector(currentUser);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Layout />;
};

export default ProtectedRoute;
