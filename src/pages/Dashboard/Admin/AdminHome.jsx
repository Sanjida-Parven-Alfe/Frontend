import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaDollarSign, FaUsers, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { AuthContext } from '../../../providers/AuthProvider';

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const pieChartData = stats.serviceStats || [];

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-8 text-white">
                Hi, Welcome Back <span className="text-brand-teal">{user?.displayName}</span>!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                
                <div className="stat glass-card bg-gradient-to-r from-purple-900 to-purple-600 rounded-2xl text-white border-none">
                    <div className="stat-figure text-purple-200">
                        <FaDollarSign className="text-4xl" />
                    </div>
                    <div className="stat-title text-purple-100">Total Revenue</div>
                    <div className="stat-value">৳{stats.revenue || 0}</div>
                    <div className="stat-desc text-purple-200">Lifetime earnings</div>
                </div>

                <div className="stat glass-card bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl text-white border-none">
                    <div className="stat-figure text-blue-200">
                        <FaUsers className="text-4xl" />
                    </div>
                    <div className="stat-title text-blue-100">Total Users</div>
                    <div className="stat-value">{stats.users || 0}</div>
                    <div className="stat-desc text-blue-200">Registered customers</div>
                </div>

                <div className="stat glass-card bg-gradient-to-r from-pink-900 to-pink-600 rounded-2xl text-white border-none">
                    <div className="stat-figure text-pink-200">
                        <FaBoxOpen className="text-4xl" />
                    </div>
                    <div className="stat-title text-pink-100">Services</div>
                    <div className="stat-value">{stats.services || 0}</div>
                    <div className="stat-desc text-pink-200">Available packages</div>
                </div>

                <div className="stat glass-card bg-gradient-to-r from-teal-900 to-teal-600 rounded-2xl text-white border-none">
                    <div className="stat-figure text-teal-200">
                        <FaClipboardList className="text-4xl" />
                    </div>
                    <div className="stat-title text-teal-100">Total Bookings</div>
                    <div className="stat-value">{stats.bookings || 0}</div>
                    <div className="stat-desc text-teal-200">All time orders</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Service Demand (Bar Chart)</h3>
                    <div className="h-[300px] w-full">
                        {pieChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={pieChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                    <XAxis dataKey="category" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top', fill: 'white' }}>
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex justify-center items-center h-full text-gray-400">
                                No Booking Data Available
                            </div>
                        )}
                    </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Category Distribution (Pie Chart)</h3>
                    <div className="h-[300px] w-full flex justify-center items-center">
                        {pieChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                            const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                                            const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                                            return (
                                                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                                    {`${(percent * 100).toFixed(0)}%`}
                                                </text>
                                            );
                                        }}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-gray-400">
                                No Booking Data Available
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;