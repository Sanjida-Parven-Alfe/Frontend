import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaStar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../components/Shared/Loading';

const ServiceDetails = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [address, setAddress] = useState('');

    const handleBookNow = () => {
        if (user) {
            setIsModalOpen(true);
        } else {
            navigate('/login', { state: { from: location } });
        }
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Processing booking...");
        
        const bookingData = {
            serviceId: service._id,
            serviceName: service.service_name,
            price: parseFloat(service.cost),
            image: service.image,
            userName: user.displayName,
            userEmail: user.email,
            date: bookingDate.toISOString().split('T')[0],
            address: address,
            status: 'pending',
            paymentStatus: 'unpaid'
        };

        axios.post('https://backend-delta-sable-65.vercel.app/bookings', bookingData)
            .then(res => {
                if(res.data.insertedId){
                    toast.success("Booking submitted successfully!", { id: loadingToast });
                    setIsModalOpen(false);
                    navigate('/dashboard/myBookings');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Something went wrong!", { id: loadingToast });
            })
    };

    if (!service) return <Loading />;

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
                        <img src={service.image} alt={service.service_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8">
                            <span className="bg-brand-teal text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-2 inline-block">
                                {service.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{service.service_name}</h1>
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
                                    {service.features?.map((feature, index) => (
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
                                        <p className="text-gray-400 text-sm">Cost</p>
                                        <p className="text-4xl font-bold text-white">৳{service.cost}</p>
                                        <p className="text-xs text-gray-400 uppercase">{service.unit}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-brand-yellow font-bold text-lg">
                                            <FaStar /> {service.rating || 4.5}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleBookNow}
                                    className="btn w-full bg-brand-teal hover:bg-teal-400 text-black font-bold text-lg rounded-xl h-14 border-none shadow-[0_0_20px_rgba(78,205,196,0.3)] hover:shadow-[0_0_30px_rgba(78,205,196,0.5)] transition-all"
                                >
                                    Book Now
                                </button>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label text-xs text-gray-400">Service</label>
                                    <input type="text" value={service.service_name} readOnly className="input input-bordered bg-black/30 text-gray-300 border-gray-600 focus:outline-none" />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs text-gray-400">Price</label>
                                    <input type="text" value={`৳${service.cost}`} readOnly className="input input-bordered bg-black/30 text-gray-300 border-gray-600 focus:outline-none" />
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