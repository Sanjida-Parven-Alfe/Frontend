import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { AuthContext } from "../../../providers/AuthProvider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetching Real dynamic data for stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Color Palette for Charts
  const colors = ["#4ECDC4", "#FF6B6B", "#FFE66D", "#0088FE", "#00C49F", "#FF8042"];
  const pieChartData = stats.serviceStats || [];

  // Helper component for Overview Cards
  const StatCard = ({ title, value, icon, gradient, subtitle }) => (
    <div className={`p-8 rounded-[32px] bg-gradient-to-br ${gradient} text-white shadow-xl flex items-center justify-between border border-white/10 hover:scale-105 transition-transform duration-300`}>
      <div>
        <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">{title}</p>
        <h3 className="text-4xl font-black">{value}</h3>
        <p className="text-[10px] mt-2 opacity-60 font-bold uppercase">{subtitle}</p>
      </div>
      <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
        {icon}
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-12">
      {/* 1. Dashboard Header */}
      <div className="flex items-center gap-5">
        <div className="avatar">
          <div className="w-20 h-20 rounded-2xl ring ring-brand-teal ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="Admin" />
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            System <span className="text-brand-teal">Insights</span>
          </h2>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
            Welcome back, {user?.displayName} (Lead Administrator)
          </p>
        </div>
      </div>

      {/* 2. Overview Cards Section (Requirement 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Revenue" value={`৳${stats.revenue || 0}`} icon={<FaDollarSign size={30} />} gradient="from-indigo-600 to-blue-500" subtitle="Lifetime Earnings" />
        <StatCard title="Customers" value={stats.users || 0} icon={<FaUsers size={30} />} gradient="from-rose-500 to-pink-500" subtitle="Total Registrations" />
        <StatCard title="Inventory" value={stats.services || 0} icon={<FaBoxOpen size={30} />} gradient="from-amber-500 to-orange-500" subtitle="Active Packages" />
        <StatCard title="Bookings" value={stats.bookings || 0} icon={<FaClipboardList size={30} />} gradient="from-teal-500 to-emerald-500" subtitle="Completed Orders" />
      </div>

      {/* 3. Charts Section (Requirement 7 - Dynamic Data Visualization) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bar Chart for Demand Analysis */}
        <div className="lg:col-span-7 glass-card p-8 rounded-[40px] border border-base-300 shadow-2xl">
          <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-gray-400">Demand by Category</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pieChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="category" stroke="#6b7280" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "#ffffff05" }} contentStyle={{ backgroundColor: "#111827", borderRadius: "15px", border: "none", color: "#fff" }} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart for Market Share */}
        <div className="lg:col-span-5 glass-card p-8 rounded-[40px] border border-base-300 shadow-2xl">
          <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-gray-400">Market Distribution</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="count" label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111827", borderRadius: "15px", border: "none" }} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Data Table Section (Requirement 7 - Real Data Display) */}
      <div className="glass-card p-8 rounded-[40px] border border-base-300 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Recent <span className="text-brand-teal">Orders</span></h3>
          <button className="btn btn-sm btn-ghost text-brand-teal font-bold gap-2 uppercase text-xs">View All <FaArrowRight /></button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="text-gray-400 uppercase text-[10px] tracking-widest border-b border-base-300">
              <tr>
                <th className="bg-transparent">Customer</th>
                <th className="bg-transparent">Service</th>
                <th className="bg-transparent">Total Price</th>
                <th className="bg-transparent">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {/* This data should ideally come from another query, using dummy rows for now */}
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="bg-transparent">john@example.com</td>
                <td className="bg-transparent">Royal Wedding Stage</td>
                <td className="bg-transparent text-brand-teal">৳45,000</td>
                <td className="bg-transparent"><span className="badge badge-success badge-sm font-bold">Completed</span></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="bg-transparent">sarah@gmail.com</td>
                <td className="bg-transparent">Minimalist Home Decor</td>
                <td className="bg-transparent text-brand-teal">৳12,000</td>
                <td className="bg-transparent"><span className="badge badge-warning badge-sm font-bold">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;