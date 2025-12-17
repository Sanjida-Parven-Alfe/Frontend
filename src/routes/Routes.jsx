import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/Login/Login' 
import SignUp from '../pages/SignUp/SignUp'
import Home from '../pages/Homepage/Home'
import Services from '../pages/Services/Services'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails'
import Contact from '../pages/Contact/Contact'
import About from '../pages/About/About'
import DashboardLayout from '../layout/DashBoardLayout'
import AddService from '../pages/Dashboard/Admin/AddService'
import AllUsers from '../pages/Dashboard/Admin/AllUsers'
import MyBookings from '../pages/Dashboard/User/MyBookings'
import ManageServices from '../pages/Dashboard/Admin/ManageServices'
import ManageBookings from '../pages/Dashboard/Admin/ManageBookings'
import MyProjects from '../pages/Dashboard/Decorator/MyProjects'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div className='text-center mt-10'>404 Not Found!</div>,
    children: [
      {
        path: '/',
        element: <Home />, 
      },
      {
        path: '/services',
        element: <Services />, 
      },
      {
        path: '/services/:id', 
        element: <ServiceDetails />, 
      },
      {
        path: '/login', 
        element: <Login />,
      },
      {
        path: '/signup', 
        element: <SignUp />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
        // Admin Routes
        {
            path: 'addService',
            element: <AddService />
        },
        {
            path: 'allUsers',
            element: <AllUsers />
        },
        // User Routes
        {
            path: 'myBookings',
            element: <MyBookings />
        },
        {
            path: 'manageServices',
            element: <ManageServices />
        },
        {
            path: 'manageBookings',
            element: <ManageBookings />
        },

        // New Decorator Route
        {
            path: 'myProjects',
            element: <MyProjects />
        }
    ]
  }
])