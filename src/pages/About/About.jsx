import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaAward, FaUsers, FaSmile, FaTools } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white -mt-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-teal rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="pt-32 pb-20 px-6 relative z-10">
       
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            About <span className="text-brand-teal">StyleDecor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            We don't just decorate spaces; we curate experiences. From intimate
            homes to grand corporate events, we bring your vision to life.
          </motion.p>
        </div>

       
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-teal to-brand-red rounded-2xl blur-lg opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              alt="Our Story"
              className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover h-[400px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">
              Crafting Dreams Since{" "}
              <span className="text-brand-yellow">2015</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              StyleDecor started with a simple mission: to make premium interior
              design and event styling accessible to everyone. What began as a
              small team of two passionate designers has now grown into a
              full-service agency.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our philosophy is rooted in the belief that your environment
              shapes your mood. That's why we meticulously plan every detail,
              from lighting to furniture placement, ensuring a harmonious
              balance between functionality and aesthetics.
            </p>

           
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="glass-card p-4 rounded-xl border-l-4 border-brand-teal">
                <h3 className="text-3xl font-bold text-white">
                  <CountUp end={500} duration={3} />+
                </h3>
                <p className="text-sm text-gray-400">Projects Completed</p>
              </div>
              <div className="glass-card p-4 rounded-xl border-l-4 border-brand-red">
                <h3 className="text-3xl font-bold text-white">
                  <CountUp end={50} duration={3} />+
                </h3>
                <p className="text-sm text-gray-400">Expert Designers</p>
              </div>
            </div>
          </motion.div>
        </div>

      
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Why <span className="text-brand-red">Choose Us?</span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaAward />,
                title: "Award Winning",
                desc: "Recognized for excellence in design.",
                color: "text-brand-yellow",
              },
              {
                icon: <FaUsers />,
                title: "Expert Team",
                desc: "Highly skilled professionals at your service.",
                color: "text-brand-teal",
              },
              {
                icon: <FaTools />,
                title: "Custom Solutions",
                desc: "Tailored designs to fit your unique needs.",
                color: "text-brand-red",
              },
              {
                icon: <FaSmile />,
                title: "100% Satisfaction",
                desc: "We ensure you love what we create.",
                color: "text-blue-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="glass-card p-8 rounded-2xl text-center border border-white/5 hover:border-white/20 transition-all"
              >
                <div
                  className={`text-4xl ${item.color} mb-4 flex justify-center`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

    
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Meet The <span className="text-brand-teal">Team</span>
            </h2>
            <p className="text-gray-400 mt-2">
              The creative minds behind the magic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Johnson",
                role: "Lead Designer",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "David Smith",
                role: "Event Planner",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Sara Lee",
                role: "Interior Architect",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl h-80"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-brand-teal">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
