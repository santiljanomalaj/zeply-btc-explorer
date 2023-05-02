import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GlobalEnv from 'configs/GlobalEnv';

const AdminPrivateRoutes = ({ component: Component }) => {
  const { user } = useSelector((state) => state.auth);

  if (GlobalEnv.isTrial) {
    return <Component />;
  }

  if (user && user?.role === 21) return <Component />;
  return <Navigate to="/login" />;
};

export default AdminPrivateRoutes;
