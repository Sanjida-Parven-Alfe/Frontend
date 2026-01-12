import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useLoaderData, Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  FaCheckCircle, FaStar, FaMapMarkerAlt, FaCalendarAlt, 
  FaInfoCircle, FaListUl, FaArrowRight, FaCommentDots 
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Shared/Loading";

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [relatedServices, setRelatedServices] = useState([]);

  // Fetch related items based on category
  useEffect(() => {
    if (service?.category) {
      axios.get(`https://backend-delta-sable-65.vercel.app/services`)
        .then(res => {
          const filtered = res.data
            .filter(item => item.category === service.category && item._id !== service._id)
            .slice(0, 3);
          setRelatedServices(filtered);
        });
    }
    // Reset scroll to top when service changes
    window.scrollTo(0, 0);
  }, [service]);

  const handleBookNow = () => {
    if (user) setIsModalOpen(true);
    else navigate("/login", { state: { from: location } });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Processing your request...");
    
    const bookingData = {
      serviceId: service._id,
      serviceName: service.service_name,
      price: parseFloat(service.cost),
      image: service.image,
      userName: user.displayName,
      userEmail: user.email,
      date: bookingDate.toISOString().split("T")[0],
      address: address,
      status: "pending",
      paymentStatus: "unpaid",
    };

    axios.post("https://backend-delta-sable-65.vercel.app/bookings", bookingData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Service booked! Check your dashboard.", { id: loadingToast });
          setIsModalOpen(false);
          navigate("/dashboard/myBookings");
        }
      })
      .catch(() => toast.error("Booking failed. Please try again.", { id: loadingToast }));
  };

  if (!service) return <Loading />;

  return (
    <div className="bg-base-100 min-h-screen py-24 px-6 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Media Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8">
            <div className="relative group rounded-[48px] overflow-hidden shadow-2xl border-4 border-base-200 h-[400px] md:h-[600px]">
              <img src={service.image} alt={service.service_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="badge bg-brand-teal text-black font-black uppercase mb-4 px-4 py-3 border-none">{service.category}</span>
                <h1 className="text-4xl md:text-6xl font-black drop-shadow-xl">{service.service_name}</h1>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="glass-card p-10 rounded-[48px] border border-base-300 shadow-2xl space-y-8">
              <div className="flex justify-between items-center pb-6 border-b border-base-300">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Cost</p>
                  <p className="text-5xl font-black text-brand-teal">৳{service.cost}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Service Score</p>
                  <div className="flex items-center justify-end gap-1 text-yellow-500 text-2xl font-bold"><FaStar /> 4.9</div>
                </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm font-bold text-gray-500"><FaMapMarkerAlt className="text-brand-teal" /> Availability: Dhaka, CTG, Sylhet</div>
                 <div className="flex items-center gap-3 text-sm font-bold text-gray-500"><FaCalendarAlt className="text-brand-red" /> Next Slots: From Tomorrow</div>
              </div>

              <button onClick={handleBookNow} className="btn btn-lg w-full rounded-full bg-black text-white hover:bg-brand-teal hover:text-black border-none shadow-xl transition-all h-16">
                Reserve Service Now
              </button>
            </div>
          </div>
        </div>

        {/* Info Tabs / Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Section 1: Description */}
            <section>
              <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter flex items-center gap-3">
                <FaInfoCircle className="text-brand-teal" /> Description / Overview
              </h2>
              <div className="glass-card p-8 rounded-[32px] border border-base-300">
                <p className="text-lg leading-relaxed text-gray-500">{service.description}</p>
              </div>
            </section>

            {/* Section 2: Key Information / Specifications */}
            <section>
              <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter flex items-center gap-3">
                <FaListUl className="text-brand-red" /> Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Material Quality", value: "Premium Grade" },
                  { label: "Setup Time", value: "4-6 Hours" },
                  { label: "Staff Count", value: "4-6 Professionals" },
                  { label: "Customization", value: "Fully Available" }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between p-6 glass-card rounded-2xl border border-base-300">
                    <span className="font-bold text-gray-400 uppercase text-xs">{spec.label}</span>
                    <span className="font-black text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Reviews Placeholder */}
            <section>
              <h2 className="text-3xl font-black mb-6 uppercase italic tracking-tighter flex items-center gap-3">
                <FaCommentDots className="text-brand-yellow" /> Client Reviews
              </h2>
              <div className="glass-card p-8 rounded-[32px] border border-base-300 text-center italic text-gray-500">
                "We had a wonderful experience with this service. Highly professional!" - Sarah K.
              </div>
            </section>
          </div>

          {/* Section 4: Related Items */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-black mb-8 border-l-8 border-brand-teal pl-4 uppercase italic">Related Events</h2>
            <div className="space-y-6">
              {relatedServices.map((item) => (
                <Link to={`/services/${item._id}`} key={item._id} className="flex gap-4 p-4 glass-card rounded-3xl border border-base-300 hover:scale-105 transition-transform group">
                  <img src={item.image} className="w-24 h-24 rounded-2xl object-cover" alt={item.service_name} />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-bold group-hover:text-brand-teal transition-colors line-clamp-1">{item.service_name}</h3>
                    <p className="text-brand-teal font-black">৳{item.cost}</p>
                    <div className="text-[10px] flex items-center gap-1 text-gray-400 mt-1 uppercase font-bold">View Item <FaArrowRight /></div>
                  </div>
                </Link>
              ))}
              {relatedServices.length === 0 && <p className="text-gray-500 italic">No related items found.</p>}
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-base-100 w-full max-w-lg rounded-[40px] shadow-2xl p-10 relative border border-base-300">
            <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle absolute right-6 top-6">✕</button>
            <h3 className="text-3xl font-black mb-8 text-center italic uppercase tracking-tighter">Confirm <span className="text-brand-teal">Booking</span></h3>
            <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase text-gray-400">Date Selection</label>
                <DatePicker selected={bookingDate} onChange={(date) => setBookingDate(date)} className="input input-bordered w-full rounded-2xl bg-base-200 border-none" minDate={new Date()} />
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase text-gray-400">Venue Address</label>
                <textarea required className="textarea textarea-bordered rounded-2xl bg-base-200 border-none h-28" placeholder="Complete address for setup..." onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>
              <button type="submit" className="btn btn-lg w-full bg-brand-teal text-black rounded-full border-none font-black uppercase tracking-widest mt-4">Book Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;