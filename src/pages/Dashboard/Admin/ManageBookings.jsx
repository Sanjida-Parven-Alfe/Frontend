import React from 'react';
import { FaUserTie, FaCheckCircle, FaClock } from 'react-icons/fa';

const ManageBookings = () => {
    const bookings = [
        { _id: 1, user: "Rahim", service: "Wedding Stage", status: "pending", payment: "paid" },
        { _id: 2, user: "Karim", service: "Office Setup", status: "confirmed", payment: "paid", decorator: "Not Assigned" },
        { _id: 3, user: "Sokina", service: "Birthday Decor", status: "pending", payment: "unpaid" },
    ];

    const handleAssignDecorator = (id) => {
        // মক ফাংশনালিটি: এখানে মোডাল ওপেন করে ডেকোরেটর সিলেক্ট করা যাবে
        const decoratorName = prompt("Enter Decorator Name to Assign:");
        if(decoratorName) alert(`Assigned ${decoratorName} to Booking ID: ${id}`);
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage <span className="text-brand-yellow">Bookings</span></h2>
            
            <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
                <table className="table w-full text-gray-300">
                    <thead className="bg-[#0b1120] text-white">
                        <tr>
                            <th>User</th>
                            <th>Service</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action (Assign)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="font-bold">{booking.user}</td>
                                <td>{booking.service}</td>
                                <td>
                                    {booking.payment === 'paid' ? 
                                        <span className="text-green-400 font-bold text-xs border border-green-400 px-2 py-1 rounded-full">PAID</span> : 
                                        <span className="text-red-400 font-bold text-xs border border-red-400 px-2 py-1 rounded-full">UNPAID</span>
                                    }
                                </td>
                                <td>
                                    <span className={`badge ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'} badge-outline text-xs`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    {booking.payment === 'paid' ? (
                                        <button 
                                            onClick={() => handleAssignDecorator(booking._id)}
                                            className="btn btn-xs bg-brand-teal text-black hover:bg-white border-none flex items-center gap-1"
                                        >
                                            <FaUserTie /> Assign Decorator
                                        </button>
                                    ) : (
                                        <span className="text-gray-500 text-xs italic">Wait for payment</span>
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