import React from "react";
import { motion } from "framer-motion"; // Correct import
import { FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    e.target.reset();
  };

  return (
    <div className="bg-base-100 min-h-screen py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black mb-4 uppercase italic tracking-tighter">
            Get in <span className="text-brand-teal">Touch</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-10 rounded-[40px] border border-base-300 shadow-2xl">
            <h3 className="text-2xl font-black mb-8 uppercase italic tracking-tighter">Quick Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name" required className="input input-bordered w-full rounded-2xl bg-base-200 border-none font-bold" />
                <input type="email" placeholder="Email" required className="input input-bordered w-full rounded-2xl bg-base-200 border-none font-bold" />
              </div>
              <textarea className="textarea textarea-bordered w-full rounded-2xl bg-base-200 border-none h-32 font-bold" placeholder="Your Message..."></textarea>
              <button className="btn btn-lg w-full bg-black text-white hover:bg-brand-teal hover:text-black border-none rounded-full font-black uppercase tracking-widest">
                Send Message <FaPaperPlane />
              </button>
            </form>
          </motion.div>

          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[32px] border border-base-300 text-center">
              <FaPhone className="text-brand-teal text-2xl mx-auto mb-4" />
              <p className="font-black">+880 1711-000000</p>
            </div>
            <div className="glass-card p-8 rounded-[32px] border border-base-300 text-center">
              <FaEnvelope className="text-brand-teal text-2xl mx-auto mb-4" />
              <p className="font-black">hello@styledecor.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;