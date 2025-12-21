import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import avatarImg from "../../assets/image/avatar.png";
import logo from "../../assets/image/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-teal-400 font-bold"
              : "font-medium text-white hover:text-teal-400 transition-colors duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-teal-400 font-bold"
              : "font-medium text-white hover:text-teal-400 transition-colors duration-200"
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-teal-400 font-bold"
              : "font-medium text-white hover:text-teal-400 transition-colors duration-200"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-teal-400 font-bold"
              : "font-medium text-white hover:text-teal-400 transition-colors duration-200"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-50 bg-[#0f172a]/95 backdrop-blur-md shadow-md px-4 lg:px-20 text-white">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden pl-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1e293b] rounded-box w-52 border border-gray-700"
          >
            {navOptions}
          </ul>
        </div>

        {/* Logo & Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="StyleDecor"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Style<span className="text-teal-400">Decor</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">{navOptions}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-teal-400/50 hover:border-teal-400 transition-all"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={user?.photoURL || avatarImg}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-[#1e293b] border border-gray-700 rounded-box w-52 text-white"
            >
              <li className="pointer-events-none px-2 py-1">
                <span className="font-bold block text-teal-400 text-center text-lg capitalize">
                  {user?.displayName}
                </span>
                <span className="block text-xs text-gray-400 text-center truncate">
                  {user?.email}
                </span>
              </li>
              <div className="divider divider-neutral my-1 before:bg-gray-600 after:bg-gray-600"></div>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-teal-400 hover:bg-white/5"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-400 pl-3 font-medium hover:bg-red-500/10 hover:text-red-500 mt-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm text-white hover:bg-white/10 font-normal hidden sm:flex"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn bg-teal-400 hover:bg-teal-500 text-black border-none btn-sm px-5 font-bold rounded-full transition-all shadow-lg shadow-teal-500/20"
            >
              Join Us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
