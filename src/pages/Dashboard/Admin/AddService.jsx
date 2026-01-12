import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaUpload } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query"; // Import QueryClient

const image_hosting_key = "7a089961132e8beee1327e27b2afc934";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddService = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient(); // Initialize QueryClient

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            // 1. Image Upload
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });
            const imgResponse = await res.json();

            if (imgResponse.success) {
                const imgURL = imgResponse.data.display_url;

                const newService = {
                    service_name: data.name,
                    cost: parseFloat(data.cost),
                    unit: data.unit,
                    category: data.category,
                    description: data.description,
                    createdByEmail: user?.email,
                    image: imgURL,
                };

                // 2. Save to DB
                const dbRes = await axiosSecure.post("/services", newService);
                if (dbRes.data.insertedId) {
                    // 3. Clear Cache so Services Page updates instantly
                    queryClient.invalidateQueries(["services"]); 
                    
                    reset();
                    Swal.fire({
                        title: "Success!",
                        text: `${data.name} added successfully.`,
                        icon: "success",
                        confirmButtonColor: "#0D9488",
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-8 text-white">
                Add a <span className="text-brand-teal">New Service</span>
            </h2>

            <div className="glass-card bg-[#1e293b] p-8 rounded-2xl border border-white/10 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text pb-2 text-gray-300">Service Name*</span></label>
                        <input type="text" placeholder="e.g. Royal Wedding Stage" {...register("name", { required: true })} className="input input-bordered pl-3 w-full bg-black/30 border-gray-600 text-white" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text pb-2 text-gray-300">Category*</span></label>
                        <select defaultValue="default" {...register("category", { required: true })} className="select select-bordered pl-3 w-full bg-black/30 border-gray-600 text-white">
                            <option disabled value="default">Select a category</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Office">Office</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Parties">Parties</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text pb-2 text-gray-300">Cost (BDT)*</span></label>
                        <input type="number" placeholder="Price" {...register("cost", { required: true })} className="input input-bordered pl-3 w-full bg-black/30 border-gray-600 text-white" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text pb-2 text-gray-300">Unit*</span></label>
                        <select defaultValue="default" {...register("unit", { required: true })} className="select select-bordered pl-3 w-full bg-black/30 border-gray-600 text-white">
                            <option disabled value="default">Select Unit</option>
                            <option value="per sqrt-ft">Per Sq-Ft</option>
                            <option value="fixed package">Fixed Package</option>
                            <option value="per hour">Per Hour</option>
                        </select>
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text pb-2 text-gray-300">Description*</span></label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24 pl-3 w-full bg-black/30 border-gray-600 text-white" placeholder="Service details..."></textarea>
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text pb-2 text-gray-300">Service Image*</span></label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full bg-black/30 border-gray-600 text-white" />
                    </div>

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