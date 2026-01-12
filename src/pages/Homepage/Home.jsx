import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaStar, FaArrowRight, FaLightbulb, FaTools, FaCalendarCheck, FaQuoteLeft, FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
  const [services, setServices] = useState([]);
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    axios.get("https://backend-delta-sable-65.vercel.app/services")
      .then((res) => setServices(res.data.slice(0, 4))) // Showing 4 for layout consistency
      .catch((err) => console.error(err));

    setDecorators([
      { id: 1, name: "Sarah Khan", specialty: "Wedding Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", rating: 4.9, border: "brand-teal" },
      { id: 2, name: "Rahim Ahmed", specialty: "Lighting Expert", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80", rating: 4.8, border: "brand-red" },
      { id: 3, name: "Nusrat Jahan", specialty: "Floral Artist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", rating: 5.0, border: "brand-yellow" },
      { id: 4, name: "David Roy", specialty: "Interior Designer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80", rating: 4.7, border: "blue-500" },
    ]);
  }, []);

  return (
    <div className="bg-base-100 text-base-content font-sans -mt-24">
      {/* 1. Hero Section (Limited to 70% height) */}
      <section className="h-[75vh] min-h-[600px] flex items-center justify-center pt-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-red rounded-full blur-[120px] animate-blob"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-teal rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-teal/30 bg-brand-teal/10">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-ping"></span>
              <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">Premium Event Styling</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Craft Your Space <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-red to-brand-yellow">Perfectly</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg leading-relaxed">
              Transform your venue into a visual masterpiece. We combine luxury aesthetics with smart event planning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn btn-lg rounded-full bg-brand-teal text-black border-none shadow-lg px-8 hover:bg-brand-teal/80">Explore Now</Link>
              <button className="btn btn-lg rounded-full btn-outline border-gray-300 px-8 hover:bg-base-200">Our Portfolio</button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[450px] hidden lg:block">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800" className="w-full h-full object-cover rounded-[60px] shadow-2xl border-4 border-base-200" alt="Hero" />
            <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl border border-brand-teal/20">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Projects Done</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="py-12 border-y border-base-200 bg-base-200/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["Projects", 540], ["Cities", 3], ["Experts", 25], ["Rating", 4.9]].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold text-brand-teal"><CountUp end={stat[1]} decimals={stat[0] === "Rating" ? 1 : 0} duration={3} />+</h3>
              <p className="text-gray-500 text-sm font-semibold uppercase mt-1">{stat[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Service Categories */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Browse by <span className="text-brand-teal">Category</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Wedding", "Home Decor", "Corporate", "Parties"].map((cat, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl hover:scale-105 cursor-pointer border border-base-300">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center text-3xl mx-auto mb-4"><FaLightbulb /></div>
              <h3 className="font-bold">{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Top Services (Desktop: 4 Cards) */}
      <section className="py-24 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Our <span className="text-brand-red">Masterpieces</span></h2>
              <p className="text-gray-500">Selection of our most booked decoration packages.</p>
            </div>
            <Link to="/services" className="text-brand-teal font-bold flex items-center gap-2 hover:underline">View All <FaArrowRight /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service._id} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:border-brand-teal transition-all">
                <img src={service.image} className="h-48 w-full object-cover" alt={service.service_name} />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2">{service.service_name}</h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">{service.description}</p>
                  <div className="flex justify-between items-center border-t border-base-300 pt-4">
                    <span className="font-bold text-brand-teal">৳{service.cost}</span>
                    <Link to={`/services/${service._id}`} className="btn btn-xs bg-brand-teal text-black border-none px-4">Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it Works */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">Simple <span className="text-brand-teal">Process</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <FaCalendarCheck />, title: "Book Date", desc: "Select your preferred date and package." },
            { icon: <FaTools />, title: "Custom Design", desc: "Our team creates a custom 3D plan." },
            { icon: <FaArrowRight />, title: "Live Execution", desc: "We handle setup while you enjoy." }
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="w-20 h-20 rounded-full bg-brand-teal/20 text-brand-teal text-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
              {i < 2 && <FaArrowRight className="hidden lg:block absolute top-10 -right-4 text-base-300 text-2xl" />}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Elite Masters (Already in code, updated for theme) */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet The <span className="text-brand-red">Masters</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {decorators.map((decorator) => (
              <div key={decorator.id} className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
                <img src={decorator.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={decorator.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className="text-xl font-bold">{decorator.name}</h3>
                  <p className="text-xs text-brand-teal font-bold uppercase tracking-widest">{decorator.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">Client <span className="text-brand-teal">Feedback</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl text-left border border-base-200">
              <FaQuoteLeft className="text-3xl text-brand-teal mb-4 opacity-50" />
              <p className="text-gray-500 italic mb-6">"The wedding decor was beyond our imagination. The team was professional and handle every tiny detail perfectly."</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-base-300"></div>
                <div>
                  <p className="font-bold text-sm">Customer Name</p>
                  <p className="text-xs text-brand-teal font-bold">Event Host</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 bg-base-200/30">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3"><FaQuestionCircle className="text-brand-teal" /> FAQ</h2>
          <div className="space-y-4">
            {["Do you work outside Dhaka?", "How early should I book?", "Can I customize the packages?"].map((q, i) => (
              <div key={i} className="collapse collapse-plus glass-card border border-base-200 rounded-2xl">
                <input type="radio" name="faq-accordion" defaultChecked={i === 0} /> 
                <div className="collapse-title text-lg font-bold">{q}</div>
                <div className="collapse-content text-sm text-gray-500">Yes, we provide services in major cities like Chittagong and Sylhet. Contact us for remote locations.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Smart Home Video / Promo */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden border-y border-white/5 my-12 mx-6 rounded-[40px] shadow-2xl">
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
            <span className="text-brand-yellow font-bold tracking-widest text-sm uppercase">
              Smart Automation
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl text-white uppercase tracking-tighter">
            Start Building Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-white">
              Smart Home Today
            </span>
          </h2>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md font-medium">
            Experience the future of living with our integrated smart home
            solutions. Control lighting, temperature, and security with a single
            touch.
          </p>
          <button className="btn h-14 px-10 rounded-full bg-brand-yellow text-black hover:bg-yellow-400 border-none text-lg font-bold shadow-[0_0_30px_rgba(255,230,109,0.3)] transition-all">
            Get Started
          </button>
        </div>
      </section>

      {/* 10. Coverage Map */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="glass-card rounded-[40px] overflow-hidden border border-base-200 p-8 grid lg:grid-cols-3 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Service <span className="text-brand-teal">Hubs</span></h2>
            <p className="text-gray-500 mb-8 text-sm">We are expanding rapidly to cover all metropolitan areas in Bangladesh.</p>
            <div className="space-y-4">
              {["Dhaka HQ", "Chittagong Hub", "Sylhet Branch"].map((hub, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-teal"></div> {hub}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden border border-base-300">
            <MapContainer center={[23.8103, 90.4125]} zoom={11} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[23.8103, 90.4125]}><Popup>StyleDecor HQ - Dhaka</Popup></Marker>
              <Marker position={[22.3569, 91.7832]}><Popup>Chittagong Hub</Popup></Marker>
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;