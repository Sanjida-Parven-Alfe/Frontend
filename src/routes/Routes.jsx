import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div className='text-center mt-10'>404 Not Found!</div>,
    children: [
      {
        path: '/',
        element: <div className='text-center text-3xl font-bold mt-20'>Welcome to Grandscape!</div>,
      },
      {
        path: '/services',
        element: <div className='text-center mt-20'>Services Page Content</div>,
      },
    ],
  },
])