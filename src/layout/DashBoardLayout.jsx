import React, { useContext } from "react";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaWallet,
  FaClipboardList,
  FaUserEdit,
  FaSignOutAlt,
  FaChartPie,
} from "react-icons/fa";
import { MdDashboard, MdAddBusiness, MdManageAccounts } from "react-icons/md";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useDecorator from "../hooks/useDecorator";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isDecorator] = useDecorator();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  const commonClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-brand-teal text-black font-bold shadow-lg shadow-teal-500/20"
        : "hover:bg-white/5 hover:text-brand-teal"
    }`;

  return (
    <div className="drawer lg:drawer-open font-sans">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-brand-dark text-white min-h-screen">
        <div className="flex items-center justify-between lg:hidden p-4 bg-[#0b1120] border-b border-white/5">
          <Link to="/" className="text-xl font-bold">
            <span className="text-brand-red">Style</span>Decor
          </Link>
          <label htmlFor="my-drawer-2" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-6 w-72 min-h-full bg-[#0b1120] text-gray-300 border-r border-white/5 space-y-2">
          {/* Brand Logo */}
          <div className="mb-10 px-2">
            <Link
              to="/"
              className="text-2xl font-black italic uppercase tracking-tighter text-white"
            >
              <span className="text-brand-teal">Style</span>Decor
            </Link>
            <div className="mt-2 inline-block px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-[10px] font-bold text-brand-teal uppercase tracking-widest">
              {isAdmin
                ? "Admin Console"
                : isDecorator
                ? "Decorator Panel"
                : "Customer Portal"}
            </div>
          </div>

          {/* Role Based Links */}
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome" className={commonClasses}>
                  <MdDashboard size={20} /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers" className={commonClasses}>
                  <FaUsers size={20} /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addService" className={commonClasses}>
                  <MdAddBusiness size={20} /> Add Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageServices"
                  className={commonClasses}
                >
                  <FaClipboardList size={20} /> Manage Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageBookings"
                  className={commonClasses}
                >
                  <FaCalendarAlt size={20} /> All Bookings
                </NavLink>
              </li>
            </>
          )}

          {isDecorator && (
            <>
              <li>
                <NavLink
                  to="/dashboard/decoratorHome"
                  className={commonClasses}
                >
                  <MdDashboard size={20} /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProjects" className={commonClasses}>
                  <FaCalendarAlt size={20} /> Projects
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/earnings" className={commonClasses}>
                  <FaWallet size={20} /> Earnings
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && !isDecorator && (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className={commonClasses}>
                  <FaChartPie size={20} /> Activity
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBookings" className={commonClasses}>
                  <FaCalendarAlt size={20} /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={commonClasses}
                >
                  <FaWallet size={20} /> Payments
                </NavLink>
              </li>
            </>
          )}

          <div className="divider opacity-5 py-4"></div>

          {/* Shared Links */}
          <li>
            <NavLink to="/dashboard/profile" className={commonClasses}>
              <FaUserEdit size={20} /> Edit Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={commonClasses}>
              <FaHome size={20} /> Main Site
            </NavLink>
          </li>

          <li className="pt-10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold"
            >
              <FaSignOutAlt size={20} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
