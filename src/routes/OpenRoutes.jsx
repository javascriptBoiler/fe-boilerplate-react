import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import OpenLayout from '../layout/OpenLayout';

const DashboardDefault = Loadable(lazy(() => import('../pages/Dashboard')));
const ContactUs = Loadable(lazy(() => import('../pages/ContactUs')));
const AboutUs = Loadable(lazy(() => import('../pages/AboutUs')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <OpenLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/contact',
      element: <ContactUs />
    },
    {
      path: '/about',
      element: <AboutUs />
    }
  ]
};

export default LoginRoutes;
