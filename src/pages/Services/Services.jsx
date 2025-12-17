import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

    useEffect(() => {
        const dummyData = [
            { id: 1, title: "Corporate Aesthetics", price: 800, category: "Corporate", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", description: "Professional decoration for office spaces." },
            { id: 2, title: "Grand Wedding Setup", price: 1200, category: "Wedding", image: "https://images.unsplash.com/photo-1519225468063-5078d2219ea2?auto=format&fit=crop&w=800&q=80", description: "Royal wedding stage and floral design." },
            { id: 3, title: "Smart Home Living", price: 500, category: "Home", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80", description: "Minimalist modern home setup." },
            { id: 4, title: "Birthday Bash", price: 300, category: "Party", image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af38?auto=format&fit=crop&w=800&q=80", description: "Colorful decorations for birthday parties." },
            { id: 5, title: "Luxury Conference", price: 1500, category: "Corporate", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", description: "High-end setups for business conferences." },
            { id: 6, title: "Cozy Bedroom", price: 450, category: "Home", image: "https://images.unsplash.com/photo-1616594039964-40891a911c25?auto=format&fit=crop&w=800&q=80", description: "Warm and cozy bedroom interior design." },
        ];
        setServices(dummyData);
    }, []);

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchText.toLowerCase());
        const matchesType = filterType === 'All' || service.category === filterType;
        const matchesPrice = service.price >= priceRange.min && service.price <= priceRange.max;
        return matchesSearch && matchesType && matchesPrice;
    });

    return (
        // Theme applied: bg-brand-dark, selection colors, -mt-20 fix
        <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white -mt-20">
            
            {/* --- Background Blobs (Home Page Theme) --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content Container (pt-32 added for navbar gap) */}
            <div className="pt-32 pb-10 px-6 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our <span className="text-brand-teal">Services</span></h1>
                    <p className="text-gray-400">Find the perfect decoration package for your next event.</p>
                </div>

                {/* Filter & Search Section (Glass Effect) */}
                <div className="max-w-6xl mx-auto glass-card p-6 rounded-2xl mb-12 border border-white/10 shadow-xl">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        
                        {/* Search */}
                        <div className="relative w-full md:w-1/3">
                            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search service name..." 
                                className="w-full bg-black/30 border border-gray-600 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:border-brand-teal transition-colors text-white"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="w-full md:w-1/4">
                            <select 
                                className="select select-bordered w-full rounded-full bg-black/30 border-gray-600 focus:border-brand-teal text-white"
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="All">All Categories</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Home">Home Decor</option>
                                <option value="Party">Party</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="w-full md:w-1/3 flex items-center gap-4">
                            <div className="flex flex-col w-full">
                                <label className="text-xs text-gray-400 mb-1">Budget Range ($)</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" placeholder="Min" 
                                        className="input input-sm input-bordered w-full bg-black/30 border-gray-600 text-white"
                                        onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value) || 0})}
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input 
                                        type="number" placeholder="Max" 
                                        className="input input-sm input-bordered w-full bg-black/30 border-gray-600 text-white"
                                        onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value) || 10000})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <motion.div 
                                key={service.id}
                                whileHover={{ y: -5 }}
                                className="glass-card rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:border-brand-teal/30 transition-all bg-brand-dark/40"
                            >
                                <figure className="h-56 overflow-hidden relative">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">
                                        {service.category}
                                    </span>
                                </figure>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                                    <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                                        <span className="text-2xl font-bold text-brand-teal">${service.price}</span>
                                        <Link to={`/services/${service.id}`}>
                                            <button className="btn btn-sm bg-white text-black hover:bg-brand-teal hover:text-black border-none rounded-full px-6 font-bold">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500 text-xl glass-card rounded-2xl">
                            No services found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;