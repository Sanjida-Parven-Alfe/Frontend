import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import logo from '../../assets/image/logo.png'
import { AuthContext } from '../../providers/AuthProvider'

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    signIn(data.email, data.password)
        .then(result => {
            navigate(from, { replace: true })
        })
        .catch(error => {
            console.error(error)
            alert("Login Failed: " + error.message)
        })
  }

  const handleGoogleLogin = () => {
     googleSignIn()
       .then(result => {
          navigate(from, { replace: true })
       })
       .catch(error => console.error(error))
  }

  return (
    <div className='flex min-h-screen bg-[#0f172a] font-sans -mt-24'>
      <div
        className='hidden lg:flex lg:w-1/2 items-center justify-center bg-cover bg-center relative'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')`, 
        }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative z-10 text-center text-white p-12'>
          <h2 className='text-5xl font-bold mb-6 tracking-tight'>Welcome Back</h2>
          <p className='text-xl font-light max-w-lg mx-auto leading-relaxed text-gray-200'>
            Your gateway to extraordinary interior designs. Sign in to continue your journey with Grandscape.
          </p>
        </div>
      </div>

      <div 
        className='w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-0'
        style={{
            backgroundColor: '#0f172a',
            backgroundImage: `
              radial-gradient(at 0% 0%, hsla(353,96%,66%,0.2) 0px, transparent 50%),
              radial-gradient(at 50% 0%, hsla(176,61%,55%,0.2) 0px, transparent 50%),
              radial-gradient(at 100% 0%, hsla(49,100%,71%,0.2) 0px, transparent 50%)
            `
        }}
      >
        <div className='w-full max-w-[450px] mt-20 lg:mt-0'> 
          <div className='text-center mb-5'>
            <img src={logo} alt="Logo" className="lg:hidden mx-auto h-12 w-auto mb-4 brightness-0 invert" />
            <h2 className='text-3xl font-bold text-white pt-4'>Sign In</h2>
            <p className='mt-2 text-gray-400 text-sm'>Please enter your details to access your account.</p>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            className="btn btn-outline w-full h-12 border-gray-600 hover:bg-white hover:text-black text-white font-medium normal-case flex items-center justify-center gap-3 transition-all duration-200 rounded-lg mb-4"
          >
             <FcGoogle className="text-2xl" />
             <span>Sign in with Google</span>
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div className="form-control w-full">
              <label className="label pb-1.5">
                <span className="label-text font-semibold text-gray-300">Email Address</span>
              </label>
              <input type="email" placeholder="mail@example.com" className={`input input-bordered pl-2 w-full h-12 bg-white/5 border-white/10 focus:border-teal-400 text-white placeholder-gray-500 transition-all rounded-lg ${errors.email ? 'input-error bg-red-900/10' : ''}`} {...register('email', { required: 'Email is required' })} />
              {errors.email && <span className='text-red-400 text-xs mt-1 font-medium'>{errors.email.message}</span>}
            </div>

            <div className="form-control w-full">
              <div className="flex justify-between items-center pb-1.5">
                  <label className="label p-0">
                    <span className="label-text font-semibold text-gray-300">Password</span>
                  </label>
                  <a href="#" className="text-xs font-medium text-teal-400 hover:text-teal-300 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className={`input input-bordered pl-2 w-full h-12 bg-white/5 border-white/10 focus:border-teal-400 text-white placeholder-gray-500 transition-all rounded-lg pr-12 ${errors.password ? 'input-error bg-red-900/10' : ''}`} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white cursor-pointer">{showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20} />}</button>
              </div>
              {errors.password && <span className='text-red-400 text-xs mt-1 font-medium'>{errors.password.message}</span>}
            </div>

            <div className="pt-2">
              <button type='submit' className='btn w-full h-12 bg-teal-400 hover:bg-teal-500 text-black font-bold text-lg rounded-lg border-none normal-case shadow-lg shadow-teal-500/20 transition-all duration-300'>Sign In</button>
            </div>
          </form>

          <p className='text-center text-sm text-gray-400 mt-6'>
            Don't have an account?{' '}
            <Link to='/signup' className='font-bold text-white hover:text-teal-400 hover:underline transition-all ml-1'>Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login