import React, { Fragment, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
// import Login from '../Login/Login';

type RouteType = {
  path: string;
  component: React.ComponentType;
};

interface AppContentProps {
  routes: RouteType[];
}

const AppContent: React.FC<AppContentProps> = ({ routes }) => {

  return (
    <Fragment>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Fragment>
  );
};

export default AppContent;
