import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  FaWallet,
  FaMoneyBillWave,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Earnings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["decorator-stats", user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorator-stats/${user?.displayName}`
      );
      return res.data;
    },
  });

  const bookings = stats.bookings || [];

  const totalEarned = bookings
    .filter((item) => item.paymentStatus === "paid")
    .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  const pendingPayment = bookings
    .filter((item) => item.paymentStatus !== "paid")
    .reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  const paidProjects = bookings.filter(
    (item) => item.paymentStatus === "paid"
  ).length;

  return (
    <div className="w-full p-4 md:p-8 bg-[#0f172a] min-h-full text-white">
      <h2 className="text-3xl font-bold mb-8">
        Earnings <span className="text-brand-teal">Summary</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="stat glass-card bg-gradient-to-r from-green-900 to-green-600 rounded-2xl text-white border-none shadow-xl">
          <div className="stat-figure text-green-200">
            <FaWallet className="text-4xl opacity-80" />
          </div>
          <div className="stat-title text-green-100 font-medium">
            Total Received
          </div>
          <div className="stat-value text-4xl font-bold mt-2">
            ৳{totalEarned}
          </div>
          <div className="stat-desc text-green-200 mt-1">
            {paidProjects} Projects Paid
          </div>
        </div>

        <div className="stat glass-card bg-gradient-to-r from-orange-900 to-orange-600 rounded-2xl text-white border-none shadow-xl">
          <div className="stat-figure text-orange-200">
            <FaMoneyBillWave className="text-4xl opacity-80" />
          </div>
          <div className="stat-title text-orange-100 font-medium">
            Pending Payments
          </div>
          <div className="stat-value text-4xl font-bold mt-2">
            ৳{pendingPayment}
          </div>
          <div className="stat-desc text-orange-200 mt-1">Unpaid Projects</div>
        </div>

        <div className="stat glass-card bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl text-white border-none shadow-xl">
          <div className="stat-figure text-blue-200">
            <FaHistory className="text-4xl opacity-80" />
          </div>
          <div className="stat-title text-blue-100 font-medium">
            Total Projects
          </div>
          <div className="stat-value text-4xl font-bold mt-2">
            {bookings.length}
          </div>
          <div className="stat-desc text-blue-200 mt-1">All time assigned</div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/10 bg-[#1e293b]">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaHistory className="text-brand-teal" /> Payment History
        </h3>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-gray-300">
              <thead className="bg-[#0b1120] text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 text-left">Service Name</th>
                  <th className="p-4 text-left">Client Name</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-bold text-white">
                      {item.serviceName}
                    </td>
                    <td className="p-4 text-sm">{item.userName}</td>
                    <td className="p-4 text-sm text-gray-400">{item.date}</td>
                    <td className="p-4 font-bold text-brand-yellow">
                      ৳{item.price}
                    </td>
                    <td className="p-4">
                      {item.paymentStatus === "paid" ? (
                        <span className="flex items-center gap-1 text-green-400 font-bold bg-green-400/10 px-3 py-1 rounded-full w-fit">
                          <FaCheckCircle /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 font-bold bg-red-400/10 px-3 py-1 rounded-full w-fit">
                          <FaTimesCircle /> Unpaid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-600 rounded-lg text-gray-400">
            <p>No payment history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Earnings;
