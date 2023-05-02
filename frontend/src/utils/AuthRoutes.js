import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GlobalEnv from 'configs/GlobalEnv';

const AuthRoutes = ({ component: Component }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (GlobalEnv.isTrial) {
    return <Component />;
  }

  if (isAuthenticated) return <Navigate to="/" />;
  return <Component />;
};

export default AuthRoutes;
