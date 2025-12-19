import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/image/logo.png";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const image_hosting_key = "7a089961132e8beee1327e27b2afc934";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    let photoURL = "https://i.ibb.co/MC1xh5r/user-avatar.png";
    try {
      if (data.photo && data.photo.length > 0) {
        const formData = new FormData();
        formData.append('image', data.photo[0]);
        const res = await axios.post(image_hosting_api, formData);
        if (res.data.success) photoURL = res.data.data.display_url;
      }
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);
      const userInfo = { name: data.name, email: data.email, image: photoURL, role: 'user' };
      const dbRes = await axios.post('https://backend-delta-sable-65.vercel.app/users', userInfo);
      if (dbRes.data.insertedId || dbRes.data.message === 'user already exists') {
        Swal.fire({ icon: 'success', title: 'Account created!', showConfirmButton: false, timer: 1500 });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Failed', text: error.message });
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = { email: result.user?.email, name: result.user?.displayName, image: result.user?.photoURL, role: 'user' }
        axios.post('https://backend-delta-sable-65.vercel.app/users', userInfo)
          .then(() => { navigate("/"); })
      })
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] -mt-24">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white p-12"><h2 className="text-5xl font-bold mb-6">Join StyleDecor</h2><p className="text-xl font-light">Create an account to unlock exclusive design features.</p></div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative overflow-y-auto" style={{ backgroundColor: "#0f172a" }}>
        <div className="w-full max-w-[500px]">
          <div className="text-center mb-4"><h2 className="text-2xl font-bold text-white">Create Account</h2></div>
          <button onClick={handleGoogleSignIn} className="btn btn-outline w-full border-gray-600 text-white rounded-lg mb-4 flex items-center justify-center gap-2"><FcGoogle className="text-xl" /> Sign up with Google</button>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control"><label className="label"><span className="label-text text-gray-300">Name</span></label><input type="text" className="input input-bordered bg-white/5 text-white" {...register("name", { required: true })} /></div>
            <div className="form-control"><label className="label"><span className="label-text text-gray-300">Email</span></label><input type="email" className="input input-bordered bg-white/5 text-white" {...register("email", { required: true })} /></div>
            <div className="form-control"><label className="label"><span className="label-text text-gray-300">Photo</span></label><input type="file" className="file-input bg-white/5 text-white" {...register("photo")} /></div>
            <div className="form-control"><label className="label"><span className="label-text text-gray-300">Password</span></label><input type="password" placeholder="Min 6 chars" className="input input-bordered bg-white/5 text-white" {...register("password", { required: true, minLength: 6 })} /></div>
            <button type="submit" className="btn w-full bg-teal-400 text-black font-bold rounded-lg border-none shadow-lg">Sign Up</button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-4">Already have an account? <Link to="/login" className="font-bold text-white hover:text-teal-400 ml-1">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;