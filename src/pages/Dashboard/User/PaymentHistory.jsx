import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import axios from 'axios';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if(user?.email) {
            axios.get(`http://localhost:3000/payments/${user.email}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
            })
            .then(res => setPayments(res.data))
            .catch(err => console.error(err));
        }
    }, [user])

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">Payment <span className="text-brand-teal">History</span></h2>
            <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
                <table className="table w-full text-gray-300">
                    <thead className="bg-[#0b1120] text-white">
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="border-b border-white/5 hover:bg-white/5">
                                <th>{index + 1}</th>
                                <td className="font-mono text-xs text-brand-yellow">{payment.transactionId}</td>
                                <td>{payment.serviceName}</td>
                                <td className="font-bold">${payment.price}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td><span className="badge badge-success badge-outline">Paid</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;