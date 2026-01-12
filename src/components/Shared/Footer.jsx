import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/image/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden font-sans border-t border-white/5">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[100px] md:text-[200px] font-bold text-white leading-none whitespace-nowrap uppercase">Style Decor</h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Ready to transform?</h2>
            <p className="text-gray-400">Subscribe for exclusive design updates.</p>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 p-1 rounded-full flex w-full max-w-md">
            <input type="email" placeholder="Enter your email" className="bg-transparent border-none text-white px-6 py-3 w-full focus:outline-none placeholder:text-gray-600 rounded-l-full" />
            <button className="btn bg-brand-teal hover:bg-white hover:text-black text-black border-none rounded-full px-8 transition-all">Subscribe</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="text-3xl font-bold flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="text-white">StyleDecor</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">Crafting atmospheres for your special moments since 2015. From luxury weddings to corporate events, we bring precision to every project.</p>
            <div className="flex gap-4">
              {[FaTwitter, FaInstagram, FaFacebookF].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-teal hover:text-black hover:border-brand-teal transition-all duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/services" className="hover:text-brand-teal transition-colors">All Services</Link></li>
              <li><Link to="/about" className="hover:text-brand-teal transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-brand-teal transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">Service Areas</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li className="flex items-center gap-2 underline underline-offset-4 decoration-brand-teal">Dhaka City</li>
              <li className="flex items-center gap-2 underline underline-offset-4 decoration-brand-teal">Chittagong Central</li>
              <li className="flex items-center gap-2 underline underline-offset-4 decoration-brand-teal">Sylhet Metro</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3"><FaMapMarkerAlt className="text-brand-teal mt-1" /> <span>Gulshan-1, Dhaka-1212, BD</span></li>
              <li className="flex items-center gap-3"><FaPhone className="text-brand-teal" /> <span>+880 1711-000000</span></li>
              <li className="flex items-center gap-3"><FaEnvelope className="text-brand-teal" /> <span>hello@styledecor.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} StyleDecor. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-bold">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;