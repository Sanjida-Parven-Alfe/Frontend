import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="bg-base-100 min-h-screen py-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-[30px] flex items-center justify-center text-4xl mx-auto mb-6"><FaShieldAlt /></div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">Privacy <span className="text-brand-teal">Matters</span></h1>
        </div>

        <div className="glass-card p-10 rounded-[48px] border border-base-300 space-y-12 shadow-2xl">
          <section>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4 flex items-center gap-3">
              <FaLock className="text-brand-teal" /> Data Policy
            </h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              We encrypt all personal data and never share your bookings with third parties. Your security is our highest priority.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;