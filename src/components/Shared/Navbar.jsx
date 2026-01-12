import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import avatarImg from "../../assets/image/avatar.png";
import logo from "../../assets/image/logo.png";
import { FaSun, FaMoon } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin"; 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin(); 
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut().then(() => navigate("/")).catch((error) => console.error(error));
  };

  const navOptions = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-brand-teal font-bold" : "font-medium hover:text-brand-teal"}>Home</NavLink></li>
      <li><NavLink to="/services" className={({ isActive }) => isActive ? "text-brand-teal font-bold" : "font-medium hover:text-brand-teal"}>Services</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-brand-teal font-bold" : "font-medium hover:text-brand-teal"}>About</NavLink></li>
      <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-brand-teal font-bold" : "font-medium hover:text-brand-teal"}>Contact</NavLink></li>
      
      {/* Requirement: 5 routes logic */}
      {user && !isAdmin && (
        <li><NavLink to="/dashboard/myBookings" className={({ isActive }) => isActive ? "text-brand-teal font-bold" : "font-medium hover:text-brand-teal"}>My Bookings</NavLink></li>
      )}

      {user && isAdmin && (
        <li><NavLink to="/dashboard/adminHome" className={({ isActive }) => isActive ? "text-brand-teal font-bold" : "font-medium hover:text-brand-teal"}>Admin Panel</NavLink></li>
      )}
    </>
  );

  return (
    <div className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 lg:px-20 ${
      theme === 'dark' ? 'bg-base-100 text-white shadow-lg' : 'bg-white/90 text-gray-800 shadow-md backdrop-blur-md'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="StyleDecor" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight">Style<span className="text-brand-teal">Decor</span></span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">{navOptions}</ul>
      </div>

      <div className="navbar-end gap-3">
        <label className="swap swap-rotate mr-2">
          <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
          <FaSun className="swap-off fill-current w-5 h-5 text-yellow-500" />
          <FaMoon className="swap-on fill-current w-5 h-5 text-brand-teal" />
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-brand-teal/50">
              <div className="w-10 rounded-full">
                <img alt="User" src={user?.photoURL || avatarImg} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
              <li className="px-4 py-2 font-bold text-brand-teal truncate">{user?.displayName}</li>
              <div className="divider my-0"></div>
              <li><Link to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}>Dashboard</Link></li>
              <li><button onClick={handleLogOut} className="text-red-500">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm hidden md:flex font-sans">Login</Link>
            <Link to="/signup" className="btn bg-brand-teal hover:bg-brand-teal/80 text-black border-none btn-sm px-5 font-bold rounded-full">Join Us</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;