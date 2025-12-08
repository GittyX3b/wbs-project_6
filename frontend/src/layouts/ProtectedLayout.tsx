import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export { ProtectedLayout };
