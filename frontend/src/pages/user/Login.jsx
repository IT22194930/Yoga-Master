import React, { useState } from 'react'
import { MdOutlineAlternateEmail, MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import GoogleLogin from '../../components/Social/GoogleLogin';

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);
   const location = useLocation();
   const {login, error, setError, loader, setLoader} = useAuth();
   const navigate = useNavigate();

   const handleSubmit = e => {
      setError('');
      e.preventDefault();

      const data = new FormData(e.target);
      const formData = Object.fromEntries(data)
      
      login(formData.email, formData.password).then(() => {
         alert(`Login successful !`)
         navigate(location.state?.from || '/')
      }).catch((err) => {
         setError(err.code);
         setLoader(false);
      })
   }

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Get Started Today</h1>
      <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Explore our comprehensive library of courses, meticulously crafted to cater to all levels of expertise.</p>

      <div className='mx-auto max-w-lg mb-0 mt-6 p-4 shadow-lg sm:p-6 lg:p-8'>
         <form onSubmit={handleSubmit} className='space-y-4'>
            <p className='text-center text-red-400 text-lg font-medium'>Sign in to your account</p>
            <div>
               <label htmlFor="email" className='sr-only'>Email</label>
               <div className='relative'>
                  <input type="email" name='email' placeholder='Enter Email' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm' />
                  <span className='absolute inset-y-0 end-0 grid place-content-center px-4'><MdOutlineAlternateEmail className='h-4 w-4 text-gray-400' /></span>
               </div>
            </div>

            {/* password */}
            <div>
               <label htmlFor="password" className='sr-only'>Password</label>
               <div className='relative'>
                  <input type={showPassword? 'text' : 'password'} name='password' placeholder='Enter Password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm' />
                  <span onClick={() => setShowPassword(!showPassword)} className='absolute inset-y-0 end-0 grid place-content-center px-4'><MdOutlineRemoveRedEye className='h-4 w-4 text-gray-400' /></span>
               </div>
            </div>
            <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white'>Sign in</button>
            <p className='text-center text-sm text-gray-500'>No account? <Link className='underline' to="/register">Sign up</Link></p>
         </form>
         <GoogleLogin/>
      </div>
    </div>
  )
}

export default Login