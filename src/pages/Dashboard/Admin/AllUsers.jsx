import React from 'react';
import { FaTrashAlt, FaUserTie } from 'react-icons/fa';

const AllUsers = () => {
    const users = [
        { _id: 1, name: "Rahim", email: "rahim@mail.com", role: "user" },
        { _id: 2, name: "Karim", email: "karim@mail.com", role: "admin" },
        { _id: 3, name: "Sokina", email: "sokina@mail.com", role: "user" },
    ];

    const handleMakeDecorator = (user) => {

        console.log(`Make ${user.name} a decorator`);
        alert(`${user.name} is now a Decorator!`);
    }

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage <span className="text-brand-teal">Users</span></h2>
            
            <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
                <table className="table w-full text-gray-300">
                    {/* Head */}
                    <thead className="bg-[#0b1120] text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action (Role)</th>
                            <th>Action (Delete)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="capitalize font-bold text-brand-yellow">{user.role}</td>
                                <td>
                                    {user.role === 'decorator' ? 'Decorator' : (
                                        <button 
                                            onClick={() => handleMakeDecorator(user)}
                                            className="btn btn-ghost btn-xs bg-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-black"
                                            disabled={user.role === 'admin'}
                                        >
                                            <FaUserTie /> Make Decorator
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/20">
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

export default AllUsers;