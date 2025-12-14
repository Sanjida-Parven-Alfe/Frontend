import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import logo from '../../assets/image/logo.png' 

const Footer = () => {
  return (
    <footer className='relative bg-black pt-20 pb-10 overflow-hidden font-sans'>
      
      <div className='absolute -top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03]'>
        <h1 className='text-[200px] font-bold text-white leading-none whitespace-nowrap'>
          GRANDSCAPE
        </h1>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
    
        {/* Newsletter Section */}
        <div className='flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12 gap-8'>
          <div>
            <h2 className='text-3xl font-bold text-white mb-2'>
              Ready to transform?
            </h2>
            <p className='text-gray-400'>
              Join our newsletter for exclusive offers.
            </p>
          </div>
          
          <div className='backdrop-blur-md bg-white/5 border border-white/10 p-1 rounded-full flex w-full max-w-md'>
            <input
              type='email'
              placeholder='Enter your email'
              className='bg-transparent border-none text-white px-6 py-3 w-full focus:outline-none placeholder:text-gray-600 rounded-l-full'
            />
            <button className='btn bg-teal-500 hover:bg-white hover:text-black text-black border-none rounded-full px-8 transition-all duration-300'>
              Subscribe
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8'>
          
          <div className='lg:col-span-3 space-y-6'>
            <div className='text-3xl font-bold flex items-center gap-2'>
               <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              <span className='text-white'>Grandscape</span>
            </div>
            <p className='text-gray-500 leading-relaxed max-w-sm text-sm'>
              Elevating events and interiors with a touch of modern luxury. We design moments that last a lifetime.
            </p>
            
            <div className='flex gap-4 pt-2'>
              <a 
                href='https://twitter.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all cursor-pointer duration-300'
              >
                <FaTwitter />
              </a>
              <a 
                href='https://instagram.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all cursor-pointer duration-300'
              >
                <FaInstagram />
              </a>
              <a 
                href='https://facebook.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all cursor-pointer duration-300'
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
       
          <div className='lg:col-span-2'>
            <h4 className='text-white font-bold mb-6'>Company</h4>
            <ul className='space-y-4 text-gray-400 text-sm'>
              <li><a className='hover:text-teal-400 transition-colors cursor-pointer'>About Us</a></li>
              <li><a className='hover:text-teal-400 transition-colors cursor-pointer'>Careers</a></li>
              <li><a className='hover:text-teal-400 transition-colors cursor-pointer'>Privacy Policy</a></li>
            </ul>
          </div>
        
          <div className='lg:col-span-2'>
            <h4 className='text-white font-bold mb-6'>Services</h4>
            <ul className='space-y-4 text-gray-400 text-sm'>
              <li><a className='hover:text-teal-400 transition-colors cursor-pointer'>Wedding Decor</a></li>
              <li><a className='hover:text-teal-400 transition-colors cursor-pointer'>Interior Design</a></li>
              <li><a className='hover:text-teal-400 transition-colors cursor-pointer'>Corporate Events</a></li>
            </ul>
          </div>
        
          <div className='lg:col-span-2'>
            <h4 className='text-white font-bold mb-6'>Hours</h4>
            <ul className='space-y-4 text-gray-400 text-sm'>
              <li>Mon - Fri: <br /><span className='text-gray-500'>9:00 AM - 8:00 PM</span></li>
              <li>Saturday: <br /><span className='text-gray-500'>10:00 AM - 6:00 PM</span></li>
              <li className='text-red-400 font-medium'>Sunday: Closed</li>
            </ul>
          </div>
      
          <div className='lg:col-span-3'>
            <h4 className='text-white font-bold mb-6'>Contact</h4>
            <ul className='space-y-4 text-gray-400 text-sm'>
              <li className='flex items-start gap-3'>
                <span className='text-teal-400 mt-1'>📍</span>
                <span>Level 4, Gulshan-1, Dhaka-1212, Bangladesh</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-teal-400'>📞</span>
                <span>+880 1711-000000</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-teal-400'>✉️</span>
                <span>hello@grandscape.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm'>
          <p>&copy; 2025 Grandscape. All rights reserved.</p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <a className='hover:text-white cursor-pointer transition-colors'>Terms</a>
            <a className='hover:text-white cursor-pointer transition-colors'>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer