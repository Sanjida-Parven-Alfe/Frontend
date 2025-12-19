import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://backend-delta-sable-65.vercel.app/services')
            .then(res => {
                setServices(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
    }, []);

    const filteredServices = services.filter(service => {
        const matchesSearch = service.service_name.toLowerCase().includes(searchText.toLowerCase());
        const matchesType = filterType === 'All' || service.category === filterType;
        const matchesPrice = service.cost >= priceRange.min && service.cost <= priceRange.max;
        return matchesSearch && matchesType && matchesPrice;
    });

    const SkeletonCard = () => (
        <div className="glass-card rounded-2xl p-6 animate-pulse bg-brand-dark/40 border border-white/5">
            <div className="bg-gray-700 h-56 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
        </div>
    );

    return (
        <div className="bg-brand-dark min-h-screen text-white font-sans -mt-20">
            <div className="pt-32 pb-10 px-6 relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our <span className="text-brand-teal">Services</span></h1>
                    <p className="text-gray-400">Find the perfect decoration package for your next event.</p>
                </div>
                <div className="max-w-6xl mx-auto glass-card p-8 rounded-2xl mb-12 border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
                        <div className="w-full md:w-5/12"><label className="text-xs text-gray-400 mb-2 block">Search Service</label><div className="relative"><FaSearch className="absolute left-4 top-3.5 text-gray-400" /><input type="text" placeholder="e.g. Wedding, Office..." className="w-full bg-black/30 border border-gray-600 rounded-xl py-3 pl-10 pr-4 focus:border-brand-teal text-white h-12" onChange={(e) => setSearchText(e.target.value)} /></div></div>
                        <div className="w-full md:w-3/12"><label className="text-xs text-gray-400 mb-2 block">Category</label><select className="select select-bordered w-full bg-black/30 border-gray-600 text-white h-12" onChange={(e) => setFilterType(e.target.value)}><option value="All">All Categories</option><option value="Corporate">Corporate</option><option value="Wedding">Wedding</option><option value="Home">Home Decor</option><option value="Party">Party</option></select></div>
                        <div className="w-full md:w-4/12"><label className="text-xs text-gray-400 mb-2 block">Budget Range</label><div className="flex gap-3 items-center"><input type="number" placeholder="Min" className="input input-bordered w-full bg-black/30 border-gray-600 h-12" onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value) || 0})} />- <input type="number" placeholder="Max" className="input input-bordered w-full bg-black/30 border-gray-600 h-12" onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value) || 100000})} /></div></div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />) : filteredServices.map(service => (
                        <motion.div key={service._id} whileHover={{ y: -5 }} className="glass-card rounded-2xl overflow-hidden border border-white/5 bg-brand-dark/40 shadow-lg">
                            <figure className="h-56 overflow-hidden relative"><img src={service.image} alt={service.service_name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /><span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full border border-white/10">{service.category}</span></figure>
                            <div className="p-6"><h3 className="text-2xl font-bold mb-2">{service.service_name}</h3><p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p><div className="flex justify-between items-center border-t border-white/10 pt-4"><span className="text-2xl font-bold text-brand-teal">৳{service.cost}</span><Link to={`/services/${service._id}`}><button className="btn btn-sm bg-white text-black hover:bg-brand-teal border-none rounded-full px-6 font-bold">Details</button></Link></div></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;