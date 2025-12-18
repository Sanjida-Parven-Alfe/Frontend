import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Home from '../pages/Homepage/Home';
import Services from '../pages/Services/Services';
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import DashboardLayout from '../layout/DashBoardLayout';
import AddService from '../pages/Dashboard/Admin/AddService';
import AllUsers from '../pages/Dashboard/Admin/AllUsers';
import ManageServices from '../pages/Dashboard/Admin/ManageServices';
import ManageBookings from '../pages/Dashboard/Admin/ManageBookings';
import AdminHome from '../pages/Dashboard/Admin/AdminHome'; 
import UpdateService from '../pages/Dashboard/Admin/UpdateService';
import MyBookings from '../pages/Dashboard/User/MyBookings';
import UserHome from '../pages/Dashboard/User/UserHome';
import Payment from '../pages/Dashboard/User/Payment';
import PaymentHistory from '../pages/Dashboard/User/PaymentHistory';
import MyProjects from '../pages/Dashboard/Decorator/MyProjects';
import DecoratorHome from '../pages/Dashboard/Decorator/DecoratorHome';
import Earnings from '../pages/Dashboard/Decorator/Earnings'; 
import PrivateRoutes from './PrivateRoutes';
import AdminRoute from './AdminRoute';
import DecoratorRoute from './DecoratorRoute';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/services', element: <Services /> },
      { 
        path: '/services/:id', 
        element: <ServiceDetails />,
        loader: async ({ params }) => {
            const res = await fetch(`http://localhost:3000/services/${params.id}`);
            if (!res.ok) {
                throw new Response("Not Found", { status: 404 });
            }
            return res.json();
        }
      },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
        {
            index: true,
            element: <Navigate to="/dashboard/userHome" replace />
        },
        {
            path: 'adminHome',
            element: <AdminRoute><AdminHome /></AdminRoute>
        },
        {
            path: 'addService',
            element: <AdminRoute><AddService /></AdminRoute>
        },
        {
            path: 'allUsers',
            element: <AdminRoute><AllUsers /></AdminRoute>
        },
        {
            path: 'manageServices',
            element: <AdminRoute><ManageServices /></AdminRoute>
        },
        {
            path: 'updateService/:id',
            element: <AdminRoute><UpdateService /></AdminRoute>,
            loader: ({params}) => fetch(`http://localhost:3000/services/${params.id}`)
        },
        {
            path: 'manageBookings',
            element: <AdminRoute><ManageBookings /></AdminRoute>
        },
        {
            path: 'userHome',
            element: <UserHome />
        },
        {
            path: 'myBookings',
            element: <MyBookings />
        },
        {
            path: 'payment',
            element: <Payment />
        },
        {
            path: 'paymentHistory',
            element: <PaymentHistory />
        },
        {
            path: 'decoratorHome', 
            element: <DecoratorRoute><DecoratorHome /></DecoratorRoute>
        },
        {
            path: 'earnings', 
            element: <DecoratorRoute><Earnings /></DecoratorRoute>
        },
        {
            path: 'myProjects',
            element: <DecoratorRoute><MyProjects /></DecoratorRoute>
        }
    ]
  }
])