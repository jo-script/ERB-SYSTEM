'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '', })
  const [message, setMessage] = useState('')
  const [validate, setValidate] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  useEffect(() => {
    if (formData.email.length !== 0 && formData.password.length !== 0) setValidate(false)
    else setValidate(true)

    const token = localStorage.getItem('token')
    if(token) router.push('/')
  }, [formData])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/login', formData)
      localStorage.setItem('token', response.data.token)
      router.push('/')
      setLoading(loading)

    } catch (error) {
      setMessage(error.response.data.error)
      console.log(error.response.data.error);
    }
  }

  if(loading) return <p>loading...</p>

  return (
    <div className='w-full h-svh  flex items-start justify-center pt-[50px] p-[3%] '>
      <div className='w-2/4  max-lg:w-4/5 flex flex-col items-start'>

        <div className=' w-full flex items-center justify-between mb-20'>
          <Image src='/img/login/Logo.svg' alt='' width={100} height={100} />
          <Link href='/signup' className='w-[100px] h-12 text-sm flex items-center justify-center text-white border bg-gradient-to-r from-[#14ADD6] to-[#384295] rounded-xl'>Sign Up</Link>
        </div>

        <div>
          <p className='text-[#383838] text-md'>Welcome back!!</p>
          <h1 className='text-[#272525] text-4xl font-semibold'>Please Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className='w-[70%]  max-lg:w-full flex flex-col mt-12 gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-[#121212] text-base'>Email</label>
            <input type="email" id='email' placeholder='email' name='email' value={formData.email} onChange={handleChange} className={` border border-[#D0D0D0] p-3 rounded-md w-full focus:border-blue-500 outline-none`} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='text-[#121212] text-base'>Password</label>
            <input type="password" id='password' placeholder='password' name='password' value={formData.password} onChange={handleChange} className={` border border-[#D0D0D0] p-3 rounded-md w-full focus:border-blue-500 outline-none`} />
          </div>
          <p className='text-red-600 text-sm'>{message}</p>

          {validate ? (<div className={` w-full h-11  text-xl flex items-center justify-center text-white bg-gradient-to-r from-[#14acd659] to-[#38419551] rounded-xl cursor-not-allowed transition-[all_.2s]`}>Login</div>) :
            (<button type='submit' className={` w-full h-11  text-xl flex items-center justify-center text-white bg-gradient-to-r from-[#14ADD6] to-[#384295] rounded-xl  hover:shadow-[0_0_7px_0_#384295] transition-[all_.2s]`}>Login</button>)
          }
        </form>
      </div>

      <div className='h-full text-center flex items-center justify-center max-lg:hidden'>
        <Image src='/img/login/login.svg' alt='' width={500} height={500} />
      </div>
    </div>
  )
}

export default Login
