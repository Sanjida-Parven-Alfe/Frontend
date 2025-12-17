import React from 'react';
import { FaCreditCard, FaTrashAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const MyBookings = () => {

    const bookings = [
        {
            _id: 1,
            serviceName: "Royal Wedding Stage",
            date: "2025-01-10",
            time: "10:00 AM",
            price: 1200,
            status: "pending", 
            paymentStatus: "unpaid"
        },
        {
            _id: 2,
            serviceName: "Corporate Office Decor",
            date: "2025-01-15",
            time: "02:00 PM",
            price: 800,
            status: "confirmed",
            paymentStatus: "paid"
        },
        {
            _id: 3,
            serviceName: "Birthday Balloon Setup",
            date: "2025-01-20",
            time: "05:00 PM",
            price: 300,
            status: "pending",
            paymentStatus: "unpaid"
        }
    ];

    const handleCancel = (id) => {
    
        const confirm = window.confirm("Are you sure you want to cancel?");
        if(confirm) alert(`Booking ${id} Cancelled`);
    }

    const handlePay = (id) => {
        
        alert(`Redirecting to payment for booking ${id}`);
    }

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">My <span className="text-brand-yellow">Bookings</span></h2>
            
            <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
                <table className="table w-full text-gray-300">
                    {/* Head */}
                    <thead className="bg-[#0b1120] text-white">
                        <tr>
                            <th>#</th>
                            <th>Service</th>
                            <th>Date & Time</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((item, index) => (
                            <tr key={item._id} className="border-b border-white/5 hover:bg-white/5">
                                <th>{index + 1}</th>
                                <td className="font-bold text-white">{item.serviceName}</td>
                                <td>
                                    <div className="flex flex-col text-sm">
                                        <span>{item.date}</span>
                                        <span className="text-gray-500 text-xs">{item.time}</span>
                                    </div>
                                </td>
                                <td className="text-brand-teal font-bold">${item.price}</td>
                                
                                {/* Status Badge */}
                                <td>
                                    {item.status === 'pending' ? (
                                        <span className="badge badge-warning gap-1 badge-outline text-xs">
                                            <FaClock /> Pending
                                        </span>
                                    ) : (
                                        <span className="badge badge-success gap-1 badge-outline text-xs">
                                            <FaCheckCircle /> Confirmed
                                        </span>
                                    )}
                                </td>

                                {/* Payment Button/Status */}
                                <td>
                                    {item.paymentStatus === 'paid' ? (
                                        <span className="text-green-400 font-bold text-sm">PAID</span>
                                    ) : (
                                        <button 
                                            onClick={() => handlePay(item._id)}
                                            className="btn btn-xs bg-brand-teal text-black hover:bg-white border-none"
                                        >
                                            <FaCreditCard /> Pay
                                        </button>
                                    )}
                                </td>

                                {/* Cancel Button */}
                                <td>
                                    {item.status === 'pending' && (
                                        <button 
                                            onClick={() => handleCancel(item._id)}
                                            className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/20"
                                        >
                                            <FaTrashAlt />
                                        </button>
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

export default MyBookings;