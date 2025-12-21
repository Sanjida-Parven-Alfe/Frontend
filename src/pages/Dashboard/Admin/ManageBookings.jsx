import React from "react";
import { FaUserTie } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const handleAssignDecorator = async (id) => {
    const { value: decoratorName } = await Swal.fire({
      title: "Assign Decorator",
      input: "text",
      inputLabel: "Enter Decorator Name",
      inputPlaceholder: "Decorator Name...",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
    });

    if (decoratorName) {
      // Call API to update status and set decorator name
      axiosSecure.patch(`/bookings/${id}`, { decoratorName }).then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire(
            "Assigned!",
            `Decorator ${decoratorName} has been assigned.`,
            "success"
          );
        }
      });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Manage <span className="text-brand-yellow">Bookings</span> (
        {bookings.length})
      </h2>

      <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
        <table className="table w-full text-gray-300">
          <thead className="bg-[#0b1120] text-white">
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Decorator</th>
              <th>Action (Assign)</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="font-bold">
                  {booking.userName} <br />
                  <span className="text-xs font-normal text-gray-500">
                    {booking.userEmail}
                  </span>
                </td>
                <td>{booking.serviceName}</td>
                <td>
                  {booking.paymentStatus === "paid" ? (
                    <span className="text-green-400 font-bold text-xs border border-green-400 px-2 py-1 rounded-full">
                      PAID
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold text-xs border border-red-400 px-2 py-1 rounded-full">
                      UNPAID
                    </span>
                  )}
                </td>
                <td>
                  <span
                    className={`badge ${
                      booking.status === "confirmed"
                        ? "badge-success"
                        : "badge-warning"
                    } badge-outline text-xs capitalize`}
                  >
                    {booking.status || "pending"}
                  </span>
                </td>
                <td className="text-brand-teal italic text-sm">
                  {booking.decorator ? booking.decorator : "Not Assigned"}
                </td>
                <td>
                  {booking.paymentStatus === "paid" ? (
                    <button
                      onClick={() => handleAssignDecorator(booking._id)}
                      className="btn btn-xs bg-brand-teal text-black hover:bg-white border-none flex items-center gap-1"
                    >
                      <FaUserTie /> {booking.decorator ? "Re-Assign" : "Assign"}
                    </button>
                  ) : (
                    <span className="text-gray-500 text-xs italic">
                      Wait for payment
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
