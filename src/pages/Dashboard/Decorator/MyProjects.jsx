import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaSyncAlt, FaUser, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClipboardList } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const MyProjects = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: projects = [], refetch } = useQuery({
        queryKey: ['my-projects', user?.displayName],
        queryFn: async () => {
            const res = await axiosSecure.get(`/decorator/bookings/${user?.displayName}`);
            return res.data;
        }
    });

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/decorator/status/${id}`, { status: newStatus })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Status Updated`,
                        text: `Project marked as ${newStatus}`,
                        showConfirmButton: false,
                        timer: 1500,
                        background: '#1e293b',
                        color: '#fff'
                    });
                }
            })
    };

    return (
        <div className="w-full p-4 md:p-8 bg-[#0f172a] min-h-full">
            <h2 className="text-3xl font-bold mb-8 text-white">
                Assigned <span className="text-brand-teal">Projects</span>
            </h2>
            
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div key={project._id} className="glass-card p-6 rounded-2xl border border-white/10 bg-[#1e293b] hover:border-brand-teal/50 transition-all duration-300">
                            
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{project.serviceName}</h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <FaUser className="text-brand-teal" /> {project.userName}
                                    </div>
                                </div>
                                <div className={`badge ${project.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'} badge-outline font-bold gap-1`}>
                                    {project.paymentStatus === 'paid' ? <FaCheckCircle/> : <FaTimesCircle/>}
                                    {project.paymentStatus === 'paid' ? 'PAID' : 'UNPAID'}
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-6 text-sm text-gray-300 bg-[#0b1120] p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-brand-red" /> 
                                    <span className="truncate">{project.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-yellow-500" /> 
                                    <span>{project.date} at {project.time}</span>
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text text-brand-teal font-bold flex items-center gap-2 text-xs uppercase tracking-wider">
                                        <FaSyncAlt /> Current Status
                                    </span>
                                </label>
                                <select 
                                    className="select select-bordered w-full bg-[#0b1120] border-gray-600 text-white focus:border-brand-teal"
                                    defaultValue={project.status || "Assigned"}
                                    onChange={(e) => handleStatusUpdate(project._id, e.target.value)}
                                    disabled={project.status === 'Completed'}
                                >
                                    <option value="Assigned">Assigned</option>
                                    <option value="Planning Phase">Planning Phase</option>
                                    <option value="Materials Prepared">Materials Prepared</option>
                                    <option value="On the Way">On the Way</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500 border-2 border-dashed border-gray-700 rounded-2xl">
                    <FaClipboardList className="text-6xl mb-4 opacity-20" />
                    <p className="text-xl">No projects assigned yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyProjects;