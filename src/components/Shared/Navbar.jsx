import { Link, NavLink } from 'react-router-dom'
import avatarImg from '../../assets/image/avatar.png'
import logo from '../../assets/image/logo.png'

const Navbar = () => {
  const user = null 
  
  const logOut = () => {
    console.log('Logout Clicked')
  }


  const navOptions = (
    <>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive 
              ? 'text-primary font-bold' 
              : 'font-medium text-white hover:text-primary transition-colors duration-200'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/services'
          className={({ isActive }) =>
            isActive 
              ? 'text-primary font-bold' 
              : 'font-medium text-white hover:text-primary transition-colors duration-200'
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive 
              ? 'text-primary font-bold' 
              : 'font-medium text-white hover:text-primary transition-colors duration-200'
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            isActive 
              ? 'text-primary font-bold' 
              : 'font-medium text-white hover:text-primary transition-colors duration-200'
          }
        >
          Contact
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to='/dashboard'
            className={({ isActive }) =>
              isActive 
                ? 'text-primary font-bold' 
                : 'font-medium text-white hover:text-primary transition-colors duration-200'
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  )

  return (
  
    <div className='navbar fixed z-10 bg-gray-900/95 backdrop-blur-md shadow-md px-4 lg:px-20 text-white'>
      
      <div className='navbar-start'>
        {/* Mobile Dropdown */}
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden pl-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52 border border-gray-700'
          >
            {navOptions}
          </ul>
        </div>
        
        {/* Logo Section */}
        <Link to='/' className='flex items-center gap-2'>
            <img src={logo} alt="Grandscape" className="w-10 h-10 md:w-10 md:h-10 object-contain" />
            <span className='text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            Grandscape
          </span>
        </Link>
      </div>

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 gap-6'>
          {navOptions}
        </ul>
      </div>

      <div className='navbar-end'>
        {user ? (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar border border-gray-500'
            >
              <div className='w-10 rounded-full'>
                <img
                  alt='User Profile'
                  src={user?.photoURL || avatarImg}
                  referrerPolicy='no-referrer'
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 border border-gray-700 rounded-box w-52 text-white'
            >
              <li className='pointer-events-none'>
                <span className='font-bold text-center block text-primary'>{user?.displayName}</span>
              </li>
              <div className='divider divider-neutral my-1'></div>
              <li>
                <Link to='/dashboard' className='hover:text-primary'>Dashboard</Link>
              </li>
              <li>
                <button onClick={logOut} className='text-error font-medium hover:bg-gray-700'>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className='flex gap-2'>

            <Link to='/login' className='btn btn-ghost btn-sm text-white hover:bg-gray-800'>
              Login
            </Link>
            <Link to='/signup' className='btn btn-primary btn-sm text-white px-4 border-none'>
              Join Us
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar