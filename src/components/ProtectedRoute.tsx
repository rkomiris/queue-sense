import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ProtectedRouteProps = {
  allowed?: Array<'consumer' | 'org-admin'>;
};

export const ProtectedRoute = ({ allowed }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
