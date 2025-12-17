import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Login from '../pages/Login/Login' 
import SignUp from '../pages/SignUp/SignUp'
import Home from '../pages/Homepage/Home'
import Services from '../pages/Services/Services'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails'


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
    ],
  },
])