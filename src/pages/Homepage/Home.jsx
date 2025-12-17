import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaStar, FaArrowRight } from 'react-icons/fa';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
    const [services, setServices] = useState([]);
    const [decorators, setDecorators] = useState([]);

    useEffect(() => {
        const dummyServices = [
            { id: 1, title: "Corporate Aesthetics", price: "$800", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80", desc: "Modern, productive, and sleek designs.", tag: "Office", color: "brand-red" },
            { id: 2, title: "Grand Wedding", price: "$1200", image: "https://images.unsplash.com/photo-1519225468063-5078d2219ea2?auto=format&fit=crop&w=800&q=80", desc: "Luxury stages, floral pathways.", tag: "Trending", color: "brand-teal" },
            { id: 3, title: "Smart Living", price: "$500", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80", desc: "Minimalist setups with smart lighting.", tag: "Home", color: "brand-yellow" },
        ];
        
        const dummyDecorators = [
            { id: 1, name: "Sarah Khan", specialty: "Wedding Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", rating: 4.9, border: "brand-teal" },
            { id: 2, name: "Rahim Ahmed", specialty: "Lighting Expert", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80", rating: 4.8, border: "brand-red" },
            { id: 3, name: "Nusrat Jahan", specialty: "Floral Artist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", rating: 5.0, border: "brand-yellow" },
            { id: 4, name: "David Roy", specialty: "Interior Designer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80", rating: 4.7, border: "blue-500" },
        ];

        setServices(dummyServices);
        setDecorators(dummyDecorators);
    }, []);

    return (
        // Gap fixed: -mt-24
        <div className="bg-brand-dark text-white font-sans selection:bg-brand-red selection:text-white -mt-24">
            
            {/* --- Background Blobs --- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            {/* --- 1. Hero Section --- */}
            {/* Gap fixed: pt-32 */}
            <div className="min-h-screen flex items-center justify-center pt-32 px-4 relative z-10">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-brand-teal/30">
                            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                            <span className="text-sm font-medium text-brand-teal uppercase tracking-widest">Premium Event Styling</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Make Your Event <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-yellow to-brand-teal text-glow">Unforgettable</span>
                        </h1>
                        
                        <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed">
                            We combine luxury design with smart planning. Transform your home or venue into a visual masterpiece with just one click.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/services">
                                <button className="btn h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 border-none text-lg font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    Get Started
                                </button>
                            </Link>
                            <button className="btn h-14 px-8 rounded-full btn-outline border-gray-600 text-white hover:bg-white/10 hover:border-white text-lg group">
                                Watch Video <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>

                        <div className="flex gap-8 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-3xl font-bold text-brand-yellow flex items-center">
                                    <CountUp end={500} duration={3} />
                                    <span>+</span>
                                </div>
                                <p className="text-gray-500 text-sm">Events Done</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-brand-teal flex items-center">
                                    <CountUp end={98} duration={3} />
                                    <span>%</span>
                                </div>
                                <p className="text-gray-500 text-sm">Satisfaction</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Images */}
                    <div className="relative h-[600px] hidden lg:flex gap-6 items-center">
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1/2 h-[450px] relative transform translate-y-12"
                        >
                            <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl relative z-10 group">
                                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Smart Interior" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-[40px] border border-brand-teal/20 -z-10"></div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1/2 h-[450px] relative transform -translate-y-12"
                        >
                             <div className="w-full h-full rounded-[40px] overflow-hidden border-4 border-white/5 shadow-2xl relative z-10 group">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Modern Living" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                             <div className="absolute -top-4 -right-4 w-full h-full rounded-[40px] border border-brand-red/20 -z-10"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- 2. Services --- */}
            <div className="py-24 px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Crafted for <span className="text-brand-teal">Perfection</span></h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Choose from our wide range of premium decoration services tailored for your needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <div key={service.id} className={`group relative ${index === 1 ? 'md:-mt-8' : ''}`}>
                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-${service.color} to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>
                            <div className="relative glass-card rounded-2xl p-6 h-full hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-48 rounded-xl overflow-hidden mb-6 relative">
                                    <img src={service.image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" alt={service.title} />
                                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">{service.tag}</div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-400 text-sm mb-6">{service.desc}</p>
                                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                    <span className={`text-xl font-bold text-${service.color}`}>{service.price}</span>
                                    <button className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-${service.color} group-hover:border-${service.color} transition-colors`}>
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 3. Decorators --- */}
            <section className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-teal/5 to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet The <span className="text-brand-red">Masters</span></h2>
                            <p className="text-gray-400 max-w-md">Our elite team of designers who turn your dreams into reality. <br /> Rated 5 stars by over 500+ clients.</p>
                        </div>
                        <button className="btn btn-outline border-white/20 hover:bg-brand-teal hover:border-brand-teal hover:text-black rounded-full px-8">
                            View All Experts →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {decorators.map((decorator) => (
                            <div key={decorator.id} className={`group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-${decorator.border}/50 transition-all duration-500`}>
                                <img src={decorator.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={decorator.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white z-20">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className={`text-${decorator.border} text-xs font-bold tracking-widest uppercase mb-1`}>{decorator.specialty.split(' ')[0]}</p>
                                        <h3 className="text-2xl font-bold">{decorator.name}</h3>
                                        <p className="text-gray-300 text-sm opacity-80">{decorator.specialty}</p>
                                    </div>
                                    <div className="translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                                        <div className="flex items-center gap-1 text-brand-yellow font-bold">
                                            <FaStar /> {decorator.rating}
                                        </div>
                                        <button className={`w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-${decorator.border} hover:text-white transition-colors`}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. Video --- */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden border-y border-white/5">
                <div className="absolute inset-0 w-full h-full z-0">
                    <iframe 
                        src="https://www.youtube.com/embed/dftKArsWaCs?controls=0&rel=0&playsinline=1&autoplay=1&mute=1&loop=1&playlist=dftKArsWaCs&showinfo=0&iv_load_policy=3&fs=0" 
                        className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" 
                        title="Smart Home Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent z-0"></div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 mb-6 border border-white/20 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                        <span className="text-brand-yellow font-bold tracking-widest text-sm uppercase">Smart Automation</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                        Start Building Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-white">Smart Home Today</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md font-medium">
                        Experience the future of living with our integrated smart home solutions. Control lighting, temperature, and security with a single touch.
                    </p>
                    <button className="btn h-14 px-10 rounded-full bg-brand-yellow text-black hover:bg-yellow-400 border-none text-lg font-bold shadow-[0_0_30px_rgba(255,230,109,0.3)]">
                        Get Started
                    </button>
                </div>
            </section>

            {/* --- 5. Map Section (Original Light Theme) --- */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="glass-card rounded-3xl overflow-hidden p-8 border border-gray-700">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 space-y-6">
                                <h2 className="text-3xl font-bold">We Cover <br /> <span className="text-brand-yellow">Major Cities</span></h2>
                                <p className="text-gray-400">Check if our service is available in your area. We are expanding rapidly!</p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 bg-brand-teal rounded-full"></span> Dhaka</li>
                                    <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 bg-brand-teal rounded-full"></span> Chittagong</li>
                                    <li className="flex items-center gap-3 text-gray-300"><span className="w-2 h-2 bg-brand-teal rounded-full"></span> Sylhet</li>
                                </ul>
                                <button className="btn bg-white text-black border-none hover:bg-gray-200 w-full rounded-lg">Check Your Location</button>
                            </div>
                            
                            {/* Standard Light Map */}
                            <div className="lg:col-span-2 h-[400px] bg-gray-800 rounded-2xl relative overflow-hidden group border border-white/10">
                                <MapContainer center={[23.8103, 90.4125]} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[23.8103, 90.4125]}>
                                        <Popup className="text-black">StyleDecor HQ - Dhaka</Popup>
                                    </Marker>
                                    <Marker position={[22.3569, 91.7832]}>
                                        <Popup className="text-black">Chittagong Hub</Popup>
                                    </Marker>
                                </MapContainer>
                                
                                <div className="absolute bottom-4 right-4 z-[1000] pointer-events-none">
                                    <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                                        <div className="w-2 h-2 bg-brand-red animate-pulse rounded-full"></div>
                                        <span className="text-white text-xs font-bold">Live Coverage</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;