import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: services = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handleDelete = (service) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete "${service.service_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${service._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Service has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Manage <span className="text-brand-teal">Services</span> (
          {services.length})
        </h2>
        <Link to="/dashboard/addService">
          <button className="btn bg-brand-teal hover:bg-teal-400 text-black border-none text-sm gap-2 font-bold px-6">
            <FaPlus /> Add New Service
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
        <table className="table w-full text-gray-300">
          <thead className="bg-[#0b1120] text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service, index) => (
              <tr
                key={service._id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <th>{indexOfFirstItem + index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={service.image} alt={service.service_name} />
                    </div>
                  </div>
                </td>
                <td className="font-bold text-white">{service.service_name}</td>
                <td>
                  <span className="badge badge-ghost text-xs bg-white/10 text-white border-none">
                    {service.category}
                  </span>
                </td>
                <td className="text-brand-yellow font-bold">
                  ৳{service.cost}{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    /{service.unit}
                  </span>
                </td>
                <td className="flex gap-2 items-center mt-2">
                  <Link to={`/dashboard/updateService/${service._id}`}>
                    <button className="btn btn-ghost btn-xs text-blue-400 hover:bg-blue-400/20">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(service)}
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-circle btn-sm bg-[#1e293b] text-white border-white/10 hover:bg-brand-teal hover:text-black disabled:opacity-30"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-brand-teal text-black shadow-lg shadow-teal-500/20"
                    : "bg-[#1e293b] text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-circle btn-sm bg-[#1e293b] text-white border-white/10 hover:bg-brand-teal hover:text-black disabled:opacity-30"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
