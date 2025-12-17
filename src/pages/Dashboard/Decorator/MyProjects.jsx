import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSyncAlt } from 'react-icons/fa';

const MyProjects = () => {
    // ডামি প্রজেক্ট ডাটা
    const [projects, setProjects] = useState([
        { _id: 101, service: "Grand Wedding Stage", client: "Mr. Khan", address: "Gulshan Club, Dhaka", status: "Assigned", date: "2025-01-20" },
        { _id: 102, service: "Corporate Seminar", client: "ABC Corp", address: "Banani, Dhaka", status: "In Progress", date: "2025-01-22" },
    ]);

    const handleStatusUpdate = (id, newStatus) => {
        // TODO: API Call to update status
        const updatedProjects = projects.map(p => p._id === id ? { ...p, status: newStatus } : p);
        setProjects(updatedProjects);
        alert(`Project status updated to: ${newStatus}`);
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8 text-white">Assigned <span className="text-brand-red">Projects</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="glass-card p-6 rounded-2xl border border-white/10 bg-[#1e293b] relative">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{project.service}</h3>
                                <p className="text-gray-400 text-sm">Client: {project.client}</p>
                            </div>
                            <span className="badge badge-primary badge-outline">{project.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-300 mb-6 text-sm">
                            <FaMapMarkerAlt className="text-brand-red" /> {project.address}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-brand-teal font-bold flex items-center gap-2"><FaSyncAlt /> Update Status</span>
                            </label>
                            <select 
                                className="select select-bordered select-sm w-full bg-black/30 border-gray-600 text-white"
                                value={project.status}
                                onChange={(e) => handleStatusUpdate(project._id, e.target.value)}
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
        </div>
    );
};

export default MyProjects;