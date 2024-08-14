'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import Image from 'next/image'
import { BsList } from "react-icons/bs";
import GetUser from '@/app/API/API';

function Nav() {

  const [title, setTitle] = useState()
  const [user, setUser] = useState()
  const [openSidebar, setOpenSidebar] = useState(false)
  useEffect(() => {

    setTitle(window.location.pathname)
    const getUser = async () => {
      const data = await GetUser()
      setUser(data)
    }
    getUser()
  }, [])
  return (
    <div className='w-full h-24 flex items-center justify-between px-[3%] bg-[#F8F9FD] fixed top-0 left-0 z-50'>

      <div className='flex items-center justify-between'>
        <BsList onClick={() => setOpenSidebar(!openSidebar)} className='mr-6 scale-[1.8] cursor-pointer' />
        <Image src='/img/login/Logo.svg' alt='' width={80} height={80} />
        <h1 className='text-xl text-[#000000c7] font-semibold ml-36'>{title}</h1>
      </div>

      <div className=' flex items-center gap-3'>
        <h3 className='font-semibold text-md'>{user ? user.username : ''}</h3>
        <Image src='/img/user.JPEG' alt='' width={40} height={40} className='rounded-xl' />
      </div>

      <div className={` ${openSidebar ? 'ml-0' : 'ml-[-260px]'}  min-h-40 z-30 absolute top-full left-0  transition-[all_.2s] `}>
        <Sidebar />
      </div>

    </div>
  )
}

export default Nav
