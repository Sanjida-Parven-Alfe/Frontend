import React from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white -mt-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Get in <span className="text-brand-yellow">Touch</span>
          </motion.h1>
          <p className="text-gray-400 text-lg">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
    
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center hover:border-brand-teal/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal mb-4 text-xl">
                  <FaPhone />
                </div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-gray-400 text-sm mt-1">+880 1711-000000</p>
              </div>
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center hover:border-brand-teal/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal mb-4 text-xl">
                  <FaEnvelope />
                </div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-gray-400 text-sm mt-1">
                  hello@styledecor.com
                </p>
              </div>
            </div>

           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">
                Send a Message
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label text-gray-400 text-sm">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input input-bordered pl-2 bg-white/5 border-gray-600 focus:border-brand-teal text-white w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-gray-400 text-sm">Email</label>
                    <input
                      type="email"
                      placeholder="mail@example.com"
                      className="input input-bordered pl-2 bg-white/5 border-gray-600 focus:border-brand-teal text-white w-full"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label text-gray-400 text-sm">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    className="input input-bordered pl-2 bg-white/5 border-gray-600 focus:border-brand-teal text-white w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label text-gray-400 text-sm">Message</label>
                  <textarea
                    className="textarea textarea-bordered pl-2 bg-white/5 border-gray-600 focus:border-brand-teal text-white h-32 w-full"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button className="btn w-full bg-brand-teal hover:bg-teal-400 text-black font-bold border-none rounded-lg mt-4 flex items-center gap-2">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            </motion.div>
          </div>

          <div className="space-y-8">
          
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white pl-2 border-l-4 border-brand-red">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    q: "How do I book a consultation?",
                    a: "You can book directly through our services page or call us for assistance.",
                  },
                  {
                    q: "Do you provide services outside Dhaka?",
                    a: "Currently, we operate in Dhaka, Chittagong, and Sylhet. Check our coverage map for details.",
                  },
                  {
                    q: "What is your refund policy?",
                    a: "You can cancel bookings up to 48 hours before the scheduled time for a full refund.",
                  },
                  {
                    q: "Can I customize decoration packages?",
                    a: "Absolutely! All our packages are customizable to suit your specific needs and budget.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="collapse collapse-plus bg-white/5 border border-white/5 rounded-xl"
                  >
                    <input
                      type="radio"
                      name="my-accordion-3"
                      defaultChecked={idx === 0}
                    />
                    <div className="collapse-title text-lg font-medium text-white">
                      {item.q}
                    </div>
                    <div className="collapse-content">
                      <p className="text-gray-400">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

       
            <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden h-64 flex items-center justify-center group">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dhaka_in_Bangladesh_%28Zoomed%29.svg/1200px-Dhaka_in_Bangladesh_%28Zoomed%29.svg.png')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 animate-bounce">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="text-xl font-bold">Visit Our HQ</h3>
                <p className="text-gray-300 text-sm">
                  Gulshan-1, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
