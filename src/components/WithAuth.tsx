import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/features/auth/authSlice';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>, requiresAuth: boolean) => {
  return (props: P) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (requiresAuth && !isAuthenticated) {
      return <Navigate to="/unauthorized" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
