import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ComponentLoader from 'utils/ComponentLoader';
import AdminPrivateRoutes from 'utils/AdminPrivateRoutes';

const DashboardDefault = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/landing')))
);
//-- error pages
const Page404 = Loadable(lazy(() => import('views/pages/error/Page404')));

const AdminRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <AdminPrivateRoutes component={DashboardDefault} />
    },
    {
      path: '*',
      element: <Page404 />
    }
  ]
};

export default AdminRoutes;
