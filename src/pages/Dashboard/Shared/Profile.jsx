import React, { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaUserEdit, FaCamera, FaEnvelope, FaShieldAlt, FaSave } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.displayName },
  });

  const onUpdate = async (data) => {
    setLoading(true);
    try {
      await updateUserProfile(data.name, user?.photoURL);
      toast.success("Identity Updated Successfully!");
    } catch (error) {
      toast.error("Failed to update profile info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">Your <span className="text-brand-teal">Identity</span></h2>
        <p className="text-gray-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">Personal Presence Management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass-card p-10 rounded-[48px] border border-base-300 text-center relative overflow-hidden group shadow-2xl bg-base-100">
          <div className="absolute top-0 left-0 w-full h-24 bg-brand-teal opacity-5"></div>
          <div className="relative mt-4">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-brand-teal ring-offset-base-100 ring-offset-4 relative mx-auto">
                <img src={user?.photoURL} alt="profile" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                  <FaCamera className="text-white text-xl" />
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-black">{user?.displayName}</h3>
            <p className="text-brand-teal font-black text-[10px] uppercase tracking-widest mt-1">Authorized Member</p>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-10 rounded-[48px] border border-base-300 shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase text-gray-400">Account Name</label>
              <div className="relative">
                <FaUserEdit className="absolute left-4 top-4 text-brand-teal" />
                <input type="text" {...register("name")} className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none font-bold focus:ring-2 focus:ring-brand-teal" />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-[10px] font-black uppercase text-gray-400">Primary Email</label>
              <div className="relative opacity-50">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                <input type="email" value={user?.email} disabled className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none font-bold" />
              </div>
            </div>

            <div className="form-control">
              <label className="label text-[10px] font-black uppercase text-gray-400">Verification Status</label>
              <div className="relative opacity-50">
                <FaShieldAlt className="absolute left-4 top-4 text-gray-400" />
                <input type="text" value="System Verified" disabled className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none font-bold uppercase tracking-widest text-xs" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="btn btn-lg w-full rounded-full bg-black text-white hover:bg-brand-teal hover:text-black border-none transition-all uppercase font-black tracking-widest mt-4">
              {loading ? <span className="loading loading-spinner"></span> : <><FaSave /> Commit Changes</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;