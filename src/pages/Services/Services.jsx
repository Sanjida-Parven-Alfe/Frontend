import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query"; // Use React Query
import axios from "axios";

const Services = () => {
    // 1. Fetch Data with TanStack Query
    const { data: services = [], isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axios.get("https://backend-delta-sable-65.vercel.app/services");
            return res.data;
        }
    });

    const [searchText, setSearchText] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");
    const [priceRange, setPriceRange] = useState(100000);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // 2. Functional Filtering Logic
    const filteredItems = services.filter((item) => {
        const matchesSearch = item.service_name.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = filterCategory === "All" || item.category === filterCategory;
        const matchesPrice = item.cost <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // 3. Sorting Logic
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOrder === "lowToHigh") return a.cost - b.cost;
        if (sortOrder === "highToLow") return b.cost - a.cost;
        return 0;
    });

    // 4. Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-base-100 min-h-screen py-24 px-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
                        Explore <span className="text-brand-teal">Premium</span> Services
                    </h1>
                    <p className="text-gray-500">Discover top-rated decor for your next grand event.</p>
                </div>

                {/* Filters Section */}
                <div className="glass-card p-8 rounded-[40px] mb-12 border border-base-300 shadow-2xl lg:flex lg:items-center lg:gap-6">
                    <div className="flex-grow relative">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input type="text" placeholder="Search by name..." className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none" onChange={(e) => setSearchText(e.target.value)} />
                    </div>

                    <div className="lg:w-48">
                        <select className="select select-bordered w-full rounded-2xl bg-base-200 border-none" onChange={(e) => setFilterCategory(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Parties">Parties</option>
                        </select>
                    </div>

                    <div className="lg:w-60 px-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 flex justify-between">
                            Max Price: <span className="text-brand-teal">৳{priceRange}</span>
                        </label>
                        <input type="range" min="0" max="100000" step="5000" value={priceRange} className="range range-teal range-xs mt-2" onChange={(e) => setPriceRange(e.target.value)} />
                    </div>

                    <div className="lg:w-48">
                        <select className="select select-bordered w-full rounded-2xl bg-brand-teal text-black" onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="default">Sort By Price</option>
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[400px]">
                    {isLoading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="glass-card rounded-[32px] p-6 animate-pulse border border-base-300 h-80 bg-gray-200"></div>
                        ))
                    ) : currentItems.length > 0 ? (
                        currentItems.map((service) => (
                            <motion.div key={service._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-[32px] overflow-hidden border border-base-300 flex flex-col h-full hover:shadow-2xl transition-all">
                                <div className="h-52 relative overflow-hidden">
                                    <img src={service.image} className="w-full h-full object-cover" alt={service.service_name} />
                                    <div className="absolute top-4 right-4 badge bg-brand-teal text-black font-bold">{service.category}</div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 truncate">{service.service_name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">{service.description}</p>
                                    <div className="flex justify-between items-center pt-4 border-t border-base-200">
                                        <span className="text-xl font-black text-brand-teal">৳{service.cost}</span>
                                        <Link to={`/services/${service._id}`}>
                                            <button className="btn w-20 btn-sm rounded-md bg-black text-white hover:bg-brand-teal hover:text-black">Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="col-span-full text-center py-20 opacity-50">No matching services found.</p>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10 gap-2">
                   {[...Array(totalPages)].map((_, i) => (
                       <button key={i} onClick={() => paginate(i+1)} className={`btn btn-circle ${currentPage === i+1 ? 'btn-active' : ''}`}>{i+1}</button>
                   ))}
                </div>
            </div>
        </div>
    );
};

export default Services;