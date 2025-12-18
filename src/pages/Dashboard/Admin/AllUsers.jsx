import React from 'react';
import { FaTrashAlt, FaUserTie } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch Users
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Filter out Admin so they don't see themselves in the list
    const displayUsers = users.filter(user => user.role !== 'admin');

    const handleMakeDecorator = (user) => {
        Swal.fire({
            title: `Make ${user.name} a Decorator?`,
            text: "They will get access to Decorator Dashboard.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0D9488',
            confirmButtonText: 'Yes, Promote!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire('Promoted!', `${user.name} is now a Decorator.`, 'success');
                        }
                    })
            }
        });
    }

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage <span className="text-brand-teal">Users</span> ({displayUsers.length})</h2>
            
            <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
                <table className="table w-full text-gray-300">
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
                        {displayUsers.map((user, index) => (
                            <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="capitalize font-bold text-brand-yellow">{user.role || 'user'}</td>
                                <td>
                                    {user.role === 'decorator' ? (
                                        <span className="text-brand-teal font-bold flex items-center gap-1"><FaUserTie/> Decorator</span>
                                    ) : (
                                        <button 
                                            onClick={() => handleMakeDecorator(user)}
                                            className="btn btn-ghost btn-xs bg-brand-teal/20 text-brand-teal hover:bg-brand-teal hover:text-black"
                                        >
                                            <FaUserTie /> Make Decorator
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(user)}
                                        className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/20"
                                    >
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