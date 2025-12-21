import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const image_hosting_key = "7a089961132e8beee1327e27b2afc934";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateService = () => {
  const service = useLoaderData();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let imageURL = service.image;

    if (data.image && data.image[0]) {
      const imageFile = { image: data.image[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        imageURL = res.data.data.display_url;
      }
    }

    const updatedItem = {
      service_name: data.service_name,
      category: data.category,
      cost: parseFloat(data.cost),
      unit: data.unit,
      description: data.description,
      image: imageURL,
    };

    const res = await axiosSecure.patch(
      `/services/${service._id}`,
      updatedItem
    );
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.service_name} is updated!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manageServices");
    }
  };

  return (
    <div className="w-full p-4 md:p-10 bg-[#0f172a] min-h-full text-white">
      <h2 className="text-3xl font-bold mb-8 text-white">
        Update <span className="text-brand-teal">Service</span>
      </h2>

      <div className="bg-[#1e293b] p-8 rounded-xl shadow-2xl border border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text pb-2 text-gray-300 font-semibold">
                  Service Name*
                </span>
              </label>
              <input
                type="text"
                defaultValue={service.service_name}
                {...register("service_name", { required: true })}
                className="input input-bordered pl-2 w-full bg-[#0f172a] border-gray-600 text-white focus:border-brand-teal"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text pb-2 text-gray-300 font-semibold">
                  Category*
                </span>
              </label>
              <select
                defaultValue={service.category}
                {...register("category", { required: true })}
                className="select select-bordered pl-2 w-full bg-[#0f172a] border-gray-600 text-white focus:border-brand-teal"
              >
                <option value="Wedding">Wedding</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Party">Party</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text pb-2 text-gray-300 font-semibold">
                  Cost (BDT)*
                </span>
              </label>
              <input
                type="number"
                defaultValue={service.cost}
                {...register("cost", { required: true })}
                className="input input-bordered pl-2 w-full bg-[#0f172a] border-gray-600 text-white focus:border-brand-teal"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text pb-2 text-gray-300 font-semibold">
                  Unit*
                </span>
              </label>
              <select
                defaultValue={service.unit}
                {...register("unit", { required: true })}
                className="select select-bordered pl-2 w-full bg-[#0f172a] border-gray-600 text-white focus:border-brand-teal"
              >
                <option value="per sqft">per sqft</option>
                <option value="per event">per event</option>
                <option value="per hour">per hour</option>
                <option value="fixed package">fixed package</option>
                <option value="per workstation">per workstation</option>
              </select>
            </div>
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text pb-2 pr-2 text-gray-300 font-semibold">
                Description*
              </span>
            </label>
            <textarea
              defaultValue={service.description}
              {...register("description", { required: true })}
              className="textarea textarea-bordered pl-2 h-24 bg-[#0f172a] border-gray-600 text-white focus:border-brand-teal"
              placeholder="Service details..."
            ></textarea>
          </div>

          <div className="form-control w-full mb-8">
            <label className="label">
              <span className="label-text pb-2 text-gray-300 font-semibold">
                Service Image (Optional)
              </span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="file-input file-input-bordered w-full bg-[#0f172a] border-gray-600 text-white file:bg-brand-teal file:text-black file:border-none hover:file:bg-teal-400"
            />
            <label className="label">
              <span className="label-text-alt text-gray-500">
                Leave empty to keep existing image
              </span>
            </label>
          </div>

          <button className="btn w-full bg-brand-teal hover:bg-teal-400 text-black font-bold border-none normal-case text-lg">
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
