import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ token }: { token: string | null }) => {
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
