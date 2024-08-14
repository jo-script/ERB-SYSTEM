'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';

// icons
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { PiNotepadFill } from "react-icons/pi";
import { IoNewspaperSharp } from "react-icons/io5";

function Sidebar() {
  const pathname = usePathname()
  const [title, setTitle] = useState()
  useEffect(() => {
    setTitle(document.title)
  }, [])
  const links = [
    {
      id:1,
      name:'Dashboard',
      icon:<TbLayoutDashboardFilled className='scale-[1.3]'/>,
      link:'/',
    },
    {
      id:2,
      name:'Staff',
      icon:<BsPeopleFill className='scale-[1.3]'/>,
      link:'staff',
    },
    {
      id:3,
      name:'Payment Voucher',
      icon:<MdOutlinePayment className='scale-[1.3]'/>,
      link:'paymentVoucher',
    },
    {
      id:4,
      name:'Payroll',
      icon:<FaFileInvoiceDollar className='scale-[1.3]'/>,
      link:'payroll',
    },
    {
      id:5,
      name:'Memo',
      icon:<PiNotepadFill className='scale-[1.3]'/>,
      link:'memo',
    },
    {
      id:6,
      name:'Circulars',
      icon:<IoNewspaperSharp  className='scale-[1.3]'/>,
      link:'circulars',
    },
  ]

  if (pathname === '/login' || pathname === '/register' ) return null;

  return (
    <div className='w-[260px] h-[100vh]  bg-white shadow flex flex-col items-start justify-start gap-1 p-2'>
      {
        links.map((data, index) => (
          <Link href={data.link} key={index} className={` ${data.name == title ? 'bg-gray-200 text-blue-500 ml-1' : ''} w-full flex items-center justify-start gap-2 p-2 text-[#272525] cursor-pointer rounded-sm hover:bg-gray-200 hover:text-blue-500 hover:ml-1 transition-[all_.2s]`}>
            {data.icon}
            <p className=''>{data.name}</p>
          </Link>
        ))
      }
    </div>
  )
}

export default Sidebar
