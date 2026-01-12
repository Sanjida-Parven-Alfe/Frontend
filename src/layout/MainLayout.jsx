import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar'
import Footer from '../components/Shared/Footer'

const MainLayout = () => {
  return (
    <div className='bg-base-100 min-h-screen flex flex-col transition-colors duration-300'>
      
      <Navbar />
      <div className='flex-grow pt-20 bg-inherit'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout