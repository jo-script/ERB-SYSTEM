'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [message, setMessage] = useState('')
  const [validate, setValidate] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  useEffect(() => {
    if (formData.email.length !== 0 && formData.password.length !== 0) setValidate(false)
    else setValidate(true)

    const token = localStorage.getItem('token')
    if (token) router.push('/')
  }, [formData])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/register', formData,)
      router.push('/login')
      setMessage(response.data.message)

    } catch (error) {
      setMessage(error.response.data.error)
    }
  }

  return (
    // <div className='w-full text-center'>
    //   <h1>register</h1>
    //   <form className=' flex flex-col items-center justify-center ' onSubmit={handleSubmit}>
    //     <input type="text" name='username' value={formData.username} placeholder='name' onChange={handleChange} />
    //     <input type="email" name='email' value={formData.email} placeholder='email' onChange={handleChange} />
    //     <input type="password" name='password' value={formData.password} placeholder='password' onChange={handleChange} />
    //     <button type='submit'>register</button>
    //     <p>{message}</p>
    //     <Link href='/login' >login</Link>
    //   </form>
    // </div>
    <div className='w-full h-svh  flex items-start justify-center pt-[50px] p-[3%] '>
      <div className='w-2/4  max-lg:w-4/5 flex flex-col items-start'>

        <div className=' w-full flex items-center justify-between mb-10'>
          <Image src='/img/login/Logo.svg' alt='' width={100} height={100} />
          <Link href='/login' className='w-[100px] h-12 text-sm flex items-center justify-center text-white border bg-gradient-to-r from-[#14ADD6] to-[#384295] rounded-xl'>Login </Link>
        </div>

        <div>
          <p className='text-[#383838] text-md'>Welcome to!!</p>
          <h1 className='text-[#272525] text-4xl font-semibold'>Please Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit} className='w-[70%]  max-lg:w-full flex flex-col mt-12 gap-6 pb-3'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='username' className='text-[#121212] text-base'>username</label>
            <input type="username" id='username' placeholder='username' name='username' value={formData.username} onChange={handleChange} className={` border border-[#D0D0D0] p-3 rounded-md w-full focus:border-blue-500 outline-none`} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className='text-[#121212] text-base'>Email</label>
            <input type="email" id='email' placeholder='email' name='email' value={formData.email} onChange={handleChange} className={` border border-[#D0D0D0] p-3 rounded-md w-full focus:border-blue-500 outline-none`} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password' className='text-[#121212] text-base'>Password</label>
            <input type="password" id='password' placeholder='password' name='password' value={formData.password} onChange={handleChange} className={` border border-[#D0D0D0] p-3 rounded-md w-full focus:border-blue-500 outline-none`} />
          </div>
          <p className='text-red-600 text-sm'>{message}</p>

          {validate ? (<div className={` w-full h-11  text-xl flex items-center justify-center text-white bg-gradient-to-r from-[#14acd659] to-[#38419551] rounded-xl cursor-not-allowed transition-[all_.2s]`}>Register</div>) :
            (<button type='submit' className={` w-full h-11  text-xl flex items-center justify-center text-white bg-gradient-to-r from-[#14ADD6] to-[#384295] rounded-xl  hover:shadow-[0_0_7px_0_#384295] transition-[all_.2s]`}>Register</button>)
          }
        </form>
      </div>

      <div className='h-full text-center flex items-center justify-center max-lg:hidden'>
        <Image src='/img/signup/signup.svg' alt='' width={600} height={600} />
      </div>
    </div>
  )
}

export default Register
