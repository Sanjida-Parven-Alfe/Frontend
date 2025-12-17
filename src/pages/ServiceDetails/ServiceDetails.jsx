import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider'; // আপনার AuthContext পাথ
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const [service, setService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Booking Form State
    const [bookingDate, setBookingDate] = useState(new Date());
    const [address, setAddress] = useState('');

    // ফেক ডাটা ফেচিং (ব্যাকএন্ড থাকলে axios দিয়ে করবেন)
    useEffect(() => {
        // এখানে আপনি id দিয়ে সার্ভার থেকে ডাটা আনবেন
        // আপাতত ডামি ডাটা:
        const dummyService = { 
            id: id, 
            title: "Corporate Aesthetics", 
            price: 800, 
            category: "Corporate", 
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", 
            description: "Transform your office space into a productive and modern environment with our premium corporate styling package. We include lighting, furniture arrangement, and branding integration.",
            features: ["Lighting Setup", "Furniture Arrangement", "Indoor Plants", "Branding Decor", "Post-event Cleanup"],
            rating: 4.8,
            reviews: 124
        };
        setService(dummyService);
    }, [id]);

    const handleBookNow = () => {
        if (user) {
            setIsModalOpen(true);
        } else {
            // লগইন না থাকলে লগইন পেজে পাঠাবে, এবং লগইন শেষে আবার এই পেজে ফিরিয়ে আনবে
            navigate('/login', { state: { from: location } });
        }
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        
        const bookingData = {
            serviceId: service.id,
            serviceName: service.title,
            price: service.price,
            image: service.image,
            userName: user.displayName,
            userEmail: user.email,
            date: bookingDate,
            address: address,
            status: 'pending'
        };

        // TODO: Send bookingData to Backend
        console.log("Booking Data:", bookingData);
        
        alert("Booking request submitted successfully!");
        setIsModalOpen(false);
    };

    if (!service) return <div className="text-center mt-32 text-white">Loading...</div>;

    return (
        <div className="bg-[#0f172a] min-h-screen text-white pt-24 pb-12 font-sans relative">
            
            {/* Service Details Container */}
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Image Section */}
                <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-2xl border border-gray-700 relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                        <span className="bg-teal-400 text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2 inline-block">
                            {service.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white shadow-black drop-shadow-lg">{service.title}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left Column: Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-teal-400">Description</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-teal-400">What's Included</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3 bg-[#1e293b] p-4 rounded-xl border border-gray-700">
                                        <FaCheckCircle className="text-green-400" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Pricing Card */}
                    <div className="md:col-span-1">
                        <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700 sticky top-28 shadow-xl">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-gray-400 text-sm">Starting Price</p>
                                    <p className="text-4xl font-bold text-white">${service.price}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg">
                                        <FaStar /> {service.rating}
                                    </div>
                                    <p className="text-xs text-gray-500">({service.reviews} reviews)</p>
                                </div>
                            </div>

                            <button 
                                onClick={handleBookNow}
                                className="btn w-full bg-teal-400 hover:bg-teal-500 text-black font-bold text-lg rounded-xl h-14 border-none shadow-lg shadow-teal-500/20"
                            >
                                Book Now
                            </button>
                            <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Booking Modal --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl border border-gray-600 shadow-2xl p-8 relative animate-blob">
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white"
                        >✕</button>
                        
                        <h3 className="text-2xl font-bold mb-6 text-center text-white">Confirm Booking</h3>
                        
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            {/* Read Only Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label text-xs text-gray-400">Service</label>
                                    <input type="text" value={service.title} readOnly className="input input-bordered bg-[#0f172a] text-gray-300 border-gray-600 focus:outline-none" />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs text-gray-400">Price</label>
                                    <input type="text" value={`$${service.price}`} readOnly className="input input-bordered bg-[#0f172a] text-gray-300 border-gray-600 focus:outline-none" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs text-gray-400">Your Name</label>
                                <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered bg-[#0f172a] text-gray-300 border-gray-600 focus:outline-none" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label text-xs text-gray-400">Your Email</label>
                                <input type="text" value={user?.email || ''} readOnly className="input input-bordered bg-[#0f172a] text-gray-300 border-gray-600 focus:outline-none" />
                            </div>

                            {/* User Input Fields */}
                            <div className="form-control">
                                <label className="label text-sm font-semibold text-teal-400 flex items-center gap-2">
                                    <FaCalendarAlt /> Select Date
                                </label>
                                <DatePicker 
                                    selected={bookingDate} 
                                    onChange={(date) => setBookingDate(date)} 
                                    className="input input-bordered w-full bg-[#0f172a] text-white border-gray-500 focus:border-teal-400"
                                    minDate={new Date()}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-sm font-semibold text-teal-400 flex items-center gap-2">
                                    <FaMapMarkerAlt /> Event Address
                                </label>
                                <textarea 
                                    required
                                    className="textarea textarea-bordered bg-[#0f172a] text-white border-gray-500 focus:border-teal-400 h-24" 
                                    placeholder="Enter full address details..."
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="btn w-full bg-teal-400 hover:bg-teal-500 text-black font-bold border-none">
                                    Confirm Purchase
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ServiceDetails;