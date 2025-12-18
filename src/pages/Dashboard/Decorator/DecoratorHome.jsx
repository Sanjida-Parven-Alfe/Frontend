import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaCheckCircle, FaClipboardList, FaWallet, FaCalendarDay } from 'react-icons/fa';

const DecoratorHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['decorator-stats', user?.displayName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/decorator-stats/${user?.displayName}`);
            return res.data;
        }
    });

    const today = new Date().toISOString().split('T')[0];
    const todaysTasks = stats.bookings?.filter(booking => booking.date === today) || [];

    return (
        <div className="w-full p-4 md:p-8 bg-[#0f172a] min-h-full text-white">
            <h2 className="text-3xl font-bold mb-8 text-white">
                Decorator <span className="text-brand-teal">Dashboard</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="stat glass-card bg-gradient-to-r from-purple-900 to-purple-600 rounded-2xl text-white border-none shadow-xl">
                    <div className="stat-figure text-purple-200">
                        <FaWallet className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-purple-100 font-medium">Total Earnings</div>
                    <div className="stat-value text-4xl font-bold mt-2">৳{stats.earnings || 0}</div>
                    <div className="stat-desc text-purple-200 mt-1">From completed projects</div>
                </div>

                <div className="stat glass-card bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl text-white border-none shadow-xl">
                    <div className="stat-figure text-blue-200">
                        <FaClipboardList className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-blue-100 font-medium">Assigned Projects</div>
                    <div className="stat-value text-4xl font-bold mt-2">{stats.totalProjects || 0}</div>
                    <div className="stat-desc text-blue-200 mt-1">Total assigned tasks</div>
                </div>

                <div className="stat glass-card bg-gradient-to-r from-teal-900 to-teal-600 rounded-2xl text-white border-none shadow-xl">
                    <div className="stat-figure text-teal-200">
                        <FaCheckCircle className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-teal-100 font-medium">Completed</div>
                    <div className="stat-value text-4xl font-bold mt-2">{stats.completedProjects || 0}</div>
                    <div className="stat-desc text-teal-200 mt-1">Successfully finished</div>
                </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 bg-[#1e293b]">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaCalendarDay className="text-brand-teal"/> Today's Schedule
                </h3>
                
                {todaysTasks.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full text-gray-300">
                            <thead className="bg-[#0b1120] text-white uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4 text-left">Service</th>
                                    <th className="p-4 text-left">Customer</th>
                                    <th className="p-4 text-left">Address</th>
                                    <th className="p-4 text-left">Time</th>
                                    <th className="p-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {todaysTasks.map(task => (
                                    <tr key={task._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-bold text-white">{task.serviceName}</td>
                                        <td className="p-4">
                                            <div className="font-semibold">{task.userName}</div>
                                            <div className="text-xs text-gray-400">{task.phone}</div>
                                        </td>
                                        <td className="p-4 text-sm">{task.address}</td>
                                        <td className="p-4 font-mono text-brand-teal">{task.time}</td>
                                        <td className="p-4">
                                            <span className={`badge border-none text-black font-bold ${
                                                task.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'
                                            }`}>
                                                {task.status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-600 rounded-lg text-gray-400">
                        <FaClipboardList className="text-4xl mb-3 opacity-30" />
                        <p>No projects scheduled for today.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DecoratorHome;