import React, { useContext } from 'react'; 
import { Link, Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaCalendarAlt, FaWallet, FaClipboardList, FaUserCog } from 'react-icons/fa';
import { MdDashboard, MdAddBusiness } from 'react-icons/md';
import { AuthContext } from '../providers/AuthProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);

    const isAdmin = true; 
    const isDecorator = false; 

    return (
        <div className="drawer lg:drawer-open font-sans">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col bg-brand-dark text-white min-h-screen">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden text-white pt-4 justify-start pl-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
                
                <div className="p-8">
                    <Outlet />
                </div>
            </div> 
            
            {/* --- Sidebar --- */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-72 min-h-full bg-[#0b1120] text-gray-300 border-r border-white/10 space-y-2">
                    
                    <div className="mb-8 px-4">
                        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-white">
                            <span className="text-brand-red">Style</span>Decor
                        </Link>
                    </div>

                    {isAdmin && (
                        <>
                            <li><NavLink to="/dashboard/adminHome" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><MdDashboard /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addService" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><MdAddBusiness /> Add Service</NavLink></li>
                            <li><NavLink to="/dashboard/manageServices" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaClipboardList /> Manage Services</NavLink></li>
                            <li><NavLink to="/dashboard/manageBookings" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaCalendarAlt /> Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allUsers" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaUsers /> All Users</NavLink></li>
                        </>
                    )}

                    {isDecorator && (
                        <>
                            <li><NavLink to="/dashboard/decoratorHome" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><MdDashboard /> Decorator Home</NavLink></li>
                            <li><NavLink to="/dashboard/myProjects" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaCalendarAlt /> Assigned Projects</NavLink></li>
                            <li><NavLink to="/dashboard/earnings" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaWallet /> Earnings</NavLink></li>
                        </>
                    )}

                    {!isAdmin && !isDecorator && (
                        <>
                            <li><NavLink to="/dashboard/userHome" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><MdDashboard /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/myBookings" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaCalendarAlt /> My Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/paymentHistory" className={({isActive}) => isActive ? "bg-brand-teal text-black font-bold" : "hover:text-brand-teal"}><FaWallet /> Payment History</NavLink></li>
                        </>
                    )}

                    <div className="divider divider-neutral"></div>

                    <li><NavLink to="/" className="hover:text-brand-teal"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/services" className="hover:text-brand-teal"><MdAddBusiness /> Services</NavLink></li>
                    <li><NavLink to="/contact" className="hover:text-brand-teal"><FaUserCog /> Contact</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;