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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 1. Handle Form Sign Up
  const onSubmit = async (data) => {
    let photoURL = "https://i.ibb.co/MC1xh5r/user-avatar.png"; // Default

    try {
      if (data.photo && data.photo.length > 0) {
        const imageFile = { image: data.photo[0] };
        const res = await axios.post(image_hosting_api, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });
        if (res.data.success) {
          photoURL = res.data.data.display_url;
        }
      }

      // Create User
      const result = await createUser(data.email, data.password);
      
      // Update Profile
      await updateUserProfile(data.name, photoURL);

      // Save to Database
      const userInfo = {
        name: data.name,
        email: data.email,
        image: photoURL,
        role: 'user'
      };

      const dbRes = await axios.post('http://localhost:3000/users', userInfo);

      if (dbRes.data.insertedId || dbRes.data.message === 'user already exists') {
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Account created successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/");
        window.location.reload();
      }

    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
    }
  };

  // 2. Handle Google Sign Up (Inside SignUp Page)
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            image: result.user?.photoURL,
            role: 'user'
        }
        // Save to DB
        axios.post('http://localhost:3000/users', userInfo)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Signed up with Google!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");
            })
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Google Sign In Failed', text: error.message });
      });
  };

  return (
    <div className="flex h-screen bg-[#0f172a] font-sans -mt-24 overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 h-full items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2000&auto=format&fit=crop')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white p-12">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Join StyleDecor</h2>
          <p className="text-xl font-light max-w-lg mx-auto leading-relaxed text-gray-200">Create an account to unlock exclusive design features.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-12 relative z-0 overflow-y-auto" style={{ backgroundColor: "#0f172a", backgroundImage: `radial-gradient(at 0% 0%, hsla(353,96%,66%,0.2) 0px, transparent 50%), radial-gradient(at 50% 0%, hsla(176,61%,55%,0.2) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(49,100%,71%,0.2) 0px, transparent 50%)` }}>
        <div className="w-full max-w-[500px] mt-16 lg:mt-0">
          <div className="text-center mb-4">
            <img src={logo} alt="StyleDecor" className="lg:hidden mx-auto h-10 w-auto mb-3 brightness-0 invert" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Create Account</h2>
          </div>

          <button onClick={handleGoogleSignIn} className="btn btn-outline w-full h-11 min-h-[44px] border-gray-600 hover:bg-white hover:text-black text-white font-medium normal-case flex items-center justify-center gap-2 transition-all duration-200 rounded-lg mb-4 text-sm">
            <FcGoogle className="text-xl" /> <span>Sign up with Google</span>
          </button>

          <div className="relative flex items-center mb-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink-0 mx-3 text-gray-500 text-xs font-medium">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="form-control w-full">
              <label className="label pb-1"><span className="label-text font-semibold text-gray-300 text-xs md:text-sm">Full Name</span></label>
              <input type="text" placeholder="Your Name" className="input input-bordered pl-2 w-full h-11 min-h-[44px] bg-white/5 border-white/10 focus:border-teal-400 text-white placeholder-gray-500 transition-all rounded-lg text-sm" {...register("name", { required: "Name is required" })} />
              {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name.message}</span>}
            </div>

            <div className="form-control w-full">
              <label className="label pb-1"><span className="label-text font-semibold text-gray-300 text-xs md:text-sm">Email Address</span></label>
              <input type="email" placeholder="mail@example.com" className="input input-bordered pl-2 w-full h-11 min-h-[44px] bg-white/5 border-white/10 focus:border-teal-400 text-white placeholder-gray-500 transition-all rounded-lg text-sm" {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" } })} />
              {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label pb-1"><span className="label-text font-semibold text-gray-300 text-xs md:text-sm">Profile Photo <span className="text-gray-500 font-normal">(Optional)</span></span></label>
              <input type="file" className="file-input file-input-bordered w-full h-11 min-h-[44px] bg-white/5 border-white/10 text-white file:bg-teal-400 file:text-black file:border-none file:font-semibold hover:file:bg-teal-500 text-sm" {...register("photo", { required: false })} />
            </div>

            <div className="form-control w-full md:col-span-2">
              <label className="label pb-1"><span className="label-text font-semibold text-gray-300 text-xs md:text-sm">Password</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Create a password" className="input input-bordered pl-2 w-full h-11 min-h-[44px] bg-white/5 border-white/10 focus:border-teal-400 text-white placeholder-gray-500 transition-all rounded-lg pr-12 text-sm" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password 6+ chars" } })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 flex items-center z-50 text-gray-400 hover:text-white cursor-pointer">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-400 text-xs mt-1">{errors.password.message}</span>}
            </div>

            <div className="pt-2 md:col-span-2">
              <button type="submit" className="btn w-full h-12 bg-teal-400 hover:bg-teal-500 text-black font-bold text-lg rounded-lg border-none normal-case shadow-lg shadow-teal-500/20 transition-all duration-300">Sign Up</button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account? <Link to="/login" className="font-bold text-white hover:text-teal-400 hover:underline transition-all ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;