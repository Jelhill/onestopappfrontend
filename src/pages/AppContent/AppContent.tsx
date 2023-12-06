import React from 'react';
import { Routes, Route } from 'react-router-dom';
import withAuth from '../../components/WithAuth';

interface RouteType {
  id: string;
  path: string;
  component: React.ComponentType;
  requiresAuth: boolean;
}

interface AppContentProps {
  routes: RouteType[];
}

const AppContent: React.FC<AppContentProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = withAuth(route.component, route.requiresAuth);
        return <Route key={route.id} path={route.path} element={<Component />} />;
      })}
    </Routes>
  );
};

export default AppContent;
