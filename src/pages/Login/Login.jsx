import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/image/logo.png";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({ position: 'top-end', icon: 'success', title: 'Login Successful', showConfirmButton: false, timer: 1500 });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({ icon: 'error', title: 'Login Failed', text: error.message });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = { email: result.user?.email, name: result.user?.displayName, image: result.user?.photoURL, role: 'user' }
        axios.post('https://backend-delta-sable-65.vercel.app/users', userInfo)
          .then(() => {
            Swal.fire({ position: 'top-end', icon: 'success', title: 'Google Login Successful', showConfirmButton: false, timer: 1500 });
            navigate(from, { replace: true });
          })
      })
      .catch((error) => {
        Swal.fire({ icon: 'error', title: 'Google Login Failed', text: error.message });
      });
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] -mt-24">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white p-12"><h2 className="text-5xl font-bold mb-6">Welcome Back</h2><p className="text-xl font-light">Your gateway to extraordinary interior designs.</p></div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-0" style={{ backgroundColor: "#0f172a" }}>
        <div className="w-full max-w-[450px]">
          <div className="text-center mb-5"><h2 className="text-3xl font-bold text-white pt-4">Sign In</h2></div>
          <button onClick={handleGoogleLogin} className="btn btn-outline w-full border-gray-600 text-white rounded-lg mb-4 flex items-center justify-center gap-3"><FcGoogle className="text-2xl" /> Sign in with Google</button>
          <div className="relative flex items-center mb-6"><div className="flex-grow border-t border-gray-700"></div><span className="mx-4 text-gray-500 text-sm">OR</span><div className="flex-grow border-t border-gray-700"></div></div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control"><label className="label"><span className="label-text text-gray-300">Email Address</span></label><input type="email" placeholder="mail@example.com" className="input input-bordered bg-white/5 border-white/10 text-white" {...register("email", { required: "Email is required" })} /></div>
            <div className="form-control"><label className="label"><span className="label-text text-gray-300">Password</span></label><div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Enter your password" size="lg" className="input input-bordered w-full bg-white/5 border-white/10 text-white" {...register("password", { required: "Password is required" })} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 text-gray-400">{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div></div>
            <button type="submit" className="btn w-full bg-teal-400 text-black font-bold text-lg rounded-lg border-none shadow-lg">Sign In</button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-6">Don't have an account? <Link to="/signup" className="font-bold text-white hover:text-teal-400">Create free account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;