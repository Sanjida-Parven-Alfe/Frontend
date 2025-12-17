import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
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

    useEffect(() => {
        // Dummy data fetch
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

        console.log("Booking Data:", bookingData);
        alert("Booking request submitted successfully!");
        setIsModalOpen(false);
    };

    if (!service) return <div className="text-center mt-32 text-white bg-brand-dark h-screen pt-20">Loading...</div>;

    return (
        <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white -mt-20">
            
   
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob animation-delay-4000"></div>
            </div>

      
            <div className="pt-32 pb-12 relative z-10 font-sans">
                <div className="max-w-6xl mx-auto px-6">
                    
              
                    <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-2xl border border-white/10 relative group">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8">
                            <span className="bg-brand-teal text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2 inline-block">
                                {service.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{service.title}</h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                        <div className="md:col-span-2 space-y-8">
                            <div className="glass-card p-8 rounded-3xl border border-white/5">
                                <h2 className="text-2xl font-bold mb-4 text-brand-teal">Description</h2>
                                <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-white pl-2 border-l-4 border-brand-red">What's Included</h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 glass-card p-4 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors">
                                            <FaCheckCircle className="text-brand-teal" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                  
                        <div className="md:col-span-1">
                            <div className="glass-card p-8 rounded-3xl border border-white/10 sticky top-28 shadow-2xl">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-gray-400 text-sm">Starting Price</p>
                                        <p className="text-4xl font-bold text-white">${service.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-brand-yellow font-bold text-lg">
                                            <FaStar /> {service.rating}
                                        </div>
                                        <p className="text-xs text-gray-500">({service.reviews} reviews)</p>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleBookNow}
                                    className="btn w-full bg-brand-teal hover:bg-teal-400 text-black font-bold text-lg rounded-xl h-14 border-none shadow-[0_0_20px_rgba(78,205,196,0.3)] hover:shadow-[0_0_30px_rgba(78,205,196,0.5)] transition-all"
                                >
                                    Book Now
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

                    <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl border border-gray-600 shadow-2xl p-8 relative">
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white hover:bg-white/10"
                        >✕</button>
                        
                        <h3 className="text-2xl font-bold mb-6 text-center text-white">Confirm Booking</h3>
                        
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            {/* Read Only Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label text-xs text-gray-400">Service</label>
                                    <input type="text" value={service.title} readOnly className="input input-bordered bg-black/30 text-gray-300 border-gray-600 focus:outline-none" />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs text-gray-400">Price</label>
                                    <input type="text" value={`$${service.price}`} readOnly className="input input-bordered bg-black/30 text-gray-300 border-gray-600 focus:outline-none" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs text-gray-400">Your Name</label>
                                <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered bg-black/30 text-gray-300 border-gray-600 focus:outline-none" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label text-xs text-gray-400">Your Email</label>
                                <input type="text" value={user?.email || ''} readOnly className="input input-bordered bg-black/30 text-gray-300 border-gray-600 focus:outline-none" />
                            </div>

                            {/* User Input Fields */}
                            <div className="form-control">
                                <label className="label text-sm font-semibold text-brand-teal flex items-center gap-2">
                                    <FaCalendarAlt /> Select Date
                                </label>
                                <DatePicker 
                                    selected={bookingDate} 
                                    onChange={(date) => setBookingDate(date)} 
                                    className="input input-bordered w-full bg-black/30 text-white border-gray-500 focus:border-brand-teal"
                                    minDate={new Date()}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-sm font-semibold text-brand-teal flex items-center gap-2">
                                    <FaMapMarkerAlt /> Event Address
                                </label>
                                <textarea 
                                    required
                                    className="textarea textarea-bordered bg-black/30 text-white border-gray-500 focus:border-brand-teal h-24" 
                                    placeholder="Enter full address details..."
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="btn w-full bg-brand-teal hover:bg-teal-400 text-black font-bold border-none rounded-full">
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