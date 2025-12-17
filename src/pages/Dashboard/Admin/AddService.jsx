import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaUpload } from 'react-icons/fa';

const AddService = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmit = data => {
        // TODO: Image Hosting API (ImgBB) তে ছবি আপলোড করতে হবে
        // তারপর ডাটাবেসে পাঠাতে হবে
        const newService = {
            service_name: data.name,
            cost: parseFloat(data.cost),
            unit: data.unit, // per sqrt-ft, per floor etc
            category: data.category,
            description: data.description,
            createdByEmail: user?.email,
            image: "dummy_url_until_implemented" 
        };
        console.log(newService);
        alert("Service Added (Console Log Check)");
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-8 text-white">Add a <span className="text-brand-teal">New Service</span></h2>
            
            <div className="glass-card bg-[#1e293b] p-8 rounded-2xl border border-white/10 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Service Name */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-gray-300">Service Name*</span></label>
                        <input type="text" placeholder="e.g. Royal Wedding Stage" {...register("name", { required: true })} className="input input-bordered w-full bg-black/30 border-gray-600 text-white" />
                    </div>

                    {/* Category */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-gray-300">Category*</span></label>
                        <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered w-full bg-black/30 border-gray-600 text-white">
                            <option disabled value="default">Select a category</option>
                            <option value="Home">Home Decor</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Office">Office</option>
                            <option value="Seminar">Seminar</option>
                        </select>
                    </div>

                    {/* Cost */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-gray-300">Cost (BDT)*</span></label>
                        <input type="number" placeholder="Price" {...register("cost", { required: true })} className="input input-bordered w-full bg-black/30 border-gray-600 text-white" />
                    </div>

                    {/* Unit */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text text-gray-300">Unit*</span></label>
                        <select defaultValue="default" {...register("unit", { required: true })} className="select select-bordered w-full bg-black/30 border-gray-600 text-white">
                            <option disabled value="default">Select Unit</option>
                            <option value="per sqrt-ft">Per Sq-Ft</option>
                            <option value="per floor">Per Floor</option>
                            <option value="fixed package">Fixed Package</option>
                            <option value="per hour">Per Hour</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text text-gray-300">Description*</span></label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24 w-full bg-black/30 border-gray-600 text-white" placeholder="Service details..."></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text text-gray-300">Service Image*</span></label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full bg-black/30 border-gray-600 text-white" />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-4">
                        <button className="btn bg-brand-teal hover:bg-teal-400 text-black border-none w-full font-bold text-lg flex items-center gap-2">
                            Add Service <FaUpload />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddService;