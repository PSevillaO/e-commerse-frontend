import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoutes({ children }) {

  const { admin } = useUser();

  return admin ? children : <Navigate to="/" replace />;
}
