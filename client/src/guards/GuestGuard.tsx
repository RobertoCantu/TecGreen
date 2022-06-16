import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Utils

import useAuth from '../hooks/useAuth';
import {PATH_DASHBOARD, PATH_ADMIN} from '../routes/paths';

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    const role = user?.role;
    if(role == 'admin'){
      return <Navigate to={PATH_ADMIN.root} />;
    } else {
      return <Navigate to={PATH_DASHBOARD.root} />;
    }
  }

  return <>{children}</>;
}