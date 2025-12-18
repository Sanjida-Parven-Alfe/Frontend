import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaCreditCard,
  FaTrashAlt,
  FaClock,
  FaCheckCircle,
  FaSortAmountDown,
} from "react-icons/fa";

const MyBookings = () => {
  const { user, loading } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email && !loading) {
      axiosSecure
        .get(`/bookings?email=${user.email}`)
        .then((res) => {
          setBookings(res.data);
          setFetchError("");
        })
        .catch((err) => {
          setFetchError("Failed to load bookings.");
        });
    }
  }, [user, loading, axiosSecure]);

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const handleCancel = (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (confirm) {
      axiosSecure.delete(`/bookings/${id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          alert("Booking cancelled successfully");
          const remaining = bookings.filter((item) => item._id !== id);
          setBookings(remaining);
        }
      });
    }
  };

  if (loading)
    return <div className="text-white p-10">Loading bookings...</div>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-white">
          My <span className="text-brand-yellow">Bookings</span> (
          {bookings.length})
        </h2>

        <div className="flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-xl border border-white/10">
          <FaSortAmountDown className="text-brand-teal" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
          >
            <option className="bg-[#1e293b]" value="newest">
              Newest First
            </option>
            <option className="bg-[#1e293b]" value="oldest">
              Oldest First
            </option>
          </select>
        </div>
      </div>

      {fetchError && (
        <div className="alert alert-error mb-6">
          <span>{fetchError}</span>
        </div>
      )}

      {bookings.length === 0 && !fetchError ? (
        <div className="text-gray-400 text-center py-10 glass-card rounded-2xl">
          <p>No bookings found. Please book a service first.</p>
        </div>
      ) : (
        <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
          <table className="table w-full text-gray-300">
            <thead className="bg-[#0b1120] text-white">
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedBookings.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <th>{index + 1}</th>
                  <td className="font-bold text-white">{item.serviceName}</td>
                  <td>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "No Date"}
                  </td>
                  <td className="text-brand-teal font-bold">৳{item.price}</td>
                  <td>
                    {item.status === "pending" ? (
                      <span className="badge badge-warning gap-1 badge-outline text-xs">
                        <FaClock /> Pending
                      </span>
                    ) : (
                      <span className="badge badge-success gap-1 badge-outline text-xs">
                        <FaCheckCircle /> Confirmed
                      </span>
                    )}
                  </td>
                  <td>
                    {item.paymentStatus === "paid" ? (
                      <span className="text-green-400 font-bold text-sm border border-green-400 px-2 py-1 rounded">
                        PAID
                      </span>
                    ) : (
                      <Link to="/dashboard/payment" state={{ booking: item }}>
                        <button className="btn btn-xs bg-brand-teal text-black hover:bg-white border-none gap-1">
                          <FaCreditCard /> Pay
                        </button>
                      </Link>
                    )}
                  </td>
                  <td>
                    {!item.paymentStatus || item.paymentStatus !== "paid" ? (
                      <button
                        onClick={() => handleCancel(item._id)}
                        className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/20"
                      >
                        <FaTrashAlt />
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500">Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
