import React from "react";
import { motion } from "framer-motion"; // Correct import
import CountUp from "react-countup";
import { FaAward, FaUsers, FaSmile, FaTools } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-base-100 min-h-screen text-base-content font-sans py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-7xl font-black mb-6 uppercase italic tracking-tighter"
          >
            Our <span className="text-brand-teal">Legacy</span>
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            StyleDecor combines luxury aesthetics with smart event planning since 2015.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -inset-4 bg-brand-teal/20 rounded-[60px] blur-2xl"></div>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800" className="relative rounded-[60px] shadow-2xl border-8 border-base-200 w-full object-cover h-[500px]" alt="Office" />
          </motion.div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold uppercase italic tracking-tighter">Design That <span className="text-brand-teal">Inspires</span></h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We meticulously plan every detail, from lighting to furniture placement, ensuring a harmonious balance between functionality and aesthetics.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-base-200 font-black uppercase tracking-tighter">
              <div>
                <h3 className="text-4xl text-brand-teal"><CountUp end={540} duration={3} />+</h3>
                <p className="text-[10px] text-gray-400 mt-2">Projects Done</p>
              </div>
              <div>
                <h3 className="text-4xl text-brand-red"><CountUp end={25} duration={3} />+</h3>
                <p className="text-[10px] text-gray-400 mt-2">Expert Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;