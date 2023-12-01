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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("in APP")
    // if (location.pathname === '/' && !localStorage.getItem('token')) {
    //   navigate('/login', { replace: true });
    // }

    // if (location.pathname === '/' && !localStorage.getItem('token')) {
    //   navigate('/login', { replace: true });
    // }
  }, [navigate, location]);

  return (
    <Fragment>
      {/* {location.pathname === '/' ? <Login /> : null} */}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Fragment>
  );
};

export default AppContent;
