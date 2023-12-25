import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard
const Missing = Loadable(lazy(() => import('../pages/Missing')));
const Customer = Loadable(lazy(() => import('../pages/Customer')));
const Calendar = Loadable(lazy(() => import('../pages/Calendar')));
const Appointment = Loadable(lazy(() => import('../pages/Appointment')));
const Pet = Loadable(lazy(() => import('../pages/Pet')));
const Walker = Loadable(lazy(() => import('../pages/Walker')));

const CreateCustomer = Loadable(lazy(() => import('../pages/Customer/CreateCustomer')));
const UpdateCustomer = Loadable(lazy(() => import('../pages/Customer/UpdateCustomer')));
const CreateAppointment = Loadable(lazy(() => import('../pages/Appointment/CreateAppointment')));
const UpdateAppointment = Loadable(lazy(() => import('../pages/Appointment/UpdateAppointment')));
const CreatePet = Loadable(lazy(() => import('../pages/Pet/CreatePet')));
const UpdatePet = Loadable(lazy(() => import('../pages/Pet/UpdatePet')));
const CreateWalker = Loadable(lazy(() => import('../pages/Walker/CreateWalker')));
const UpdateWalker = Loadable(lazy(() => import('../pages/Walker/UpdateWalker')));

const SamplePage = Loadable(lazy(() => import('../pages/SamplePage')));
const Unauthorized = Loadable(lazy(() => import('../pages/Unauthorized')));

// ==============================|| MAIN ROUTING ||============================== //


const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/customer',
      element: <Customer />
    },
    {
      path: '/calender',
      element: <Calendar />
    },
    {
      path: '/appointment',
      element: <Appointment/>
    },
    {
      path: '/pet',
      element: <Pet/>
    },
    {
      path: '/walker',
      element: <Walker/>
    },
    {
      path: '/walker/new',
      element: <CreateWalker/>
    },
    {
      path: '/walker/:walkerID',
      element: <UpdateWalker/>
    },
    {
      path: '/pet/new',
      element: <CreatePet/>
    },
    {
      path: '/pet/:petID',
      element: <UpdatePet/>
    },
    {
      path: '/appointment/new',
      element: <CreateAppointment/>
    },
    {
      path: '/appointment/:appointmentID',
      element: <UpdateAppointment/>
    },
    {
      path: '/customer/new',
      element: <CreateCustomer />
    },
    {
      path: '/customer/:customerId',
      element: <UpdateCustomer />
    },
    {
      path: '/sample-page/:id',
      element: <SamplePage />
    },
    {
      path: '*',
      element: <Missing />
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />
    }
  ],
};

export default MainRoutes;
