import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-white mb-8">
        Welcome Back,{" "}
        <span className="text-brand-teal">{user?.displayName}</span>!
      </h2>

      {/* Profile Card */}
      <div className="glass-card p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center max-w-lg w-full shadow-2xl bg-[#1e293b]/50">
        {/* Profile Image with Ring */}
        <div className="avatar mb-6">
          <div className="w-32 rounded-full ring ring-brand-teal ring-offset-base-100 ring-offset-2">
            <img
              src={user?.photoURL || "https://i.ibb.co/MC1xh5r/user-avatar.png"}
              alt="profile"
            />
          </div>
        </div>

        {/* Name & Email */}
        <h3 className="text-2xl font-bold text-white mb-1">
          {user?.displayName}
        </h3>
        <p className="text-brand-yellow text-sm font-semibold uppercase tracking-widest mb-6">
          Valued Customer
        </p>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-6"></div>

        {/* Info List */}
        <div className="w-full space-y-4 text-left">
          <div className="flex items-center gap-4 text-gray-300 bg-black/20 p-3 rounded-lg">
            <div className="p-2 bg-brand-teal/20 rounded-full text-brand-teal">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-xs text-gray-400">Email Address</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-300 bg-black/20 p-3 rounded-lg">
            <div className="p-2 bg-brand-teal/20 rounded-full text-brand-teal">
              <FaPhoneAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="font-semibold">Not Provided</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-300 bg-black/20 p-3 rounded-lg">
            <div className="p-2 bg-brand-teal/20 rounded-full text-brand-teal">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400">Address</p>
              <p className="font-semibold">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
