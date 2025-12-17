import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageServices = () => {
    const services = [
        { _id: 1, name: "Royal Wedding Stage", category: "Wedding", price: 1200, unit: "per event" },
        { _id: 2, name: "Corporate Office Decor", category: "Office", price: 50, unit: "per sq-ft" },
        { _id: 3, name: "Birthday Balloon Blast", category: "Party", price: 300, unit: "fixed" },
    ];

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this service?")) {
            alert("Service Deleted!");
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage <span className="text-brand-teal">Services</span></h2>
            
            <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
                <table className="table w-full text-gray-300">
                    <thead className="bg-[#0b1120] text-white">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Unit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={service._id} className="border-b border-white/5 hover:bg-white/5">
                                <th>{index + 1}</th>
                                <td className="font-bold text-white">{service.name}</td>
                                <td><span className="badge badge-ghost text-xs">{service.category}</span></td>
                                <td className="text-brand-yellow font-bold">${service.price}</td>
                                <td className="text-xs uppercase">{service.unit}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-ghost btn-xs text-blue-400 hover:bg-blue-400/20">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(service._id)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/20">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServices;