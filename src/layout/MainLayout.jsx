import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar'


const MainLayout = () => {
  return (
    <div className='bg-white'>
      <Navbar />
      
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>

    </div>
  )
}

export default MainLayout