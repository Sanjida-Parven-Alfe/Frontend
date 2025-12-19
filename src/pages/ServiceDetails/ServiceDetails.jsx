import React, { useContext, useState } from "react";
import { useNavigate, useLocation, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCheckCircle,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
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

  const handleBookNow = () => {
    if (user) setIsModalOpen(true);
    else navigate("/login", { state: { from: location } });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Processing...");

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

    axios
      .post("https://backend-delta-sable-65.vercel.app/bookings", bookingData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Booking successful!", { id: loadingToast });
          setIsModalOpen(false);
          navigate("/dashboard/myBookings");
        }
      })
      .catch(() => toast.error("Error!", { id: loadingToast }));
  };

  if (!service) return <Loading />;

  return (
    <div className="bg-brand-dark min-h-screen text-white -mt-20">
      <div className="pt-32 pb-12 relative z-10 px-6 max-w-6xl mx-auto">
        <div className="w-full h-[400px] rounded-3xl overflow-hidden mb-10 border border-white/10 relative">
          <img
            src={service.image}
            alt={service.service_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <span className="bg-brand-teal text-black px-4 py-1 rounded-full text-sm font-bold">
              {service.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-2">
              {service.service_name}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-4 text-brand-teal">
                Description
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="glass-card p-8 rounded-3xl border border-white/10 sticky top-28">
              <p className="text-gray-400 text-sm">Cost</p>
              <p className="text-4xl font-bold text-white">৳{service.cost}</p>
              <button
                onClick={handleBookNow}
                className="btn w-full bg-brand-teal hover:bg-teal-400 text-black font-bold mt-6 h-14 rounded-xl border-none shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1e293b] w-full max-w-lg rounded-2xl p-8 relative border border-gray-600 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6 text-center">
              Confirm Booking
            </h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label text-gray-400">Date</label>
                <DatePicker
                  selected={bookingDate}
                  onChange={(date) => setBookingDate(date)}
                  className="input input-bordered w-full bg-black/30 border-gray-500"
                  minDate={new Date()}
                />
              </div>
              <div className="form-control">
                <label className="label text-gray-400">Address</label>
                <textarea
                  required
                  className="textarea textarea-bordered bg-black/30 border-gray-500 h-24"
                  placeholder="Event Location..."
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-full bg-brand-teal text-black font-bold rounded-full border-none mt-4"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
