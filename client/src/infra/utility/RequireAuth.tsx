import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { IRootState } from '../../domain/usecases/store/rootState';

// Utility component to check authentication
const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
    const userData = useSelector((state: IRootState) => state.user?.username);
  const location = useLocation();

  if (!userData) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectUrl}`} />;
  }

  return <>{children}</>;
};

export default RequireAuth;