'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateStaff from './components/createStaff'
import EditStaff from './components/editStaff'

import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";



function Staff() {
  const [staffData, setStaffData] = useState()
  const [createStaff, setCreateStaff] = useState(false)
  const [editStaff, setEditStaff] = useState(false)
  const [deleteStaff, setDeleteStaff] = useState(null)
  const [idStaff, setIdStaff] = useState(null)

  useEffect(() => {
    document.title = 'Staff'
    const token = localStorage.getItem('token')
    const getAllStaff = async () => {
      try {
        const response = await axios.get('http://localhost:4000/staff', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStaffData(response.data);
      } catch (error) {
        console.log({ error: error.message });
      }
    }
    getAllStaff()
  }, [])

  const handleDeleteStaff = async () => {
    if (deleteStaff === null) return;

    const token = localStorage.getItem('token')
    try {
      await axios.delete(`http://localhost:4000/deleteStaff/${deleteStaff}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStaffData(prev => prev.filter(staff => staff._id !== deleteStaff))
      setDeleteStaff(null) // Reset deleteStaff state after deletion
    } catch (error) {
      console.log({ error: error.message });
    }
  }

  if (!staffData) return <div>Loading...</div>

  return (
    <div className='relative flex items-center justify-center flex-col gap-3'>

      {deleteStaff && (<div onClick={() => setDeleteStaff(null)} className='backdrop-blur-sm bg-white-2/3 w-full h-full z-40 absolute'></div>)}
      <div className={` ${deleteStaff ? 'scale-[1]' : 'scale-0'} p-3  w-[300px] h-[180px] flex flex-col  justify-evenly bg-white shadow-md rounded-md scale-0 fixed top-2/4 border border-t-4 border-t-red-600  z-[999]`}>
        <h2 className='text-md text-gray-700'>Do you want to confirm the deletion?</h2>

        <div className='w-full flex items-center justify-between gap-2 '>
          <button onClick={handleDeleteStaff} className='bg-red-600 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'>Confirm Delete</button>
          <button onClick={() => setDeleteStaff(null)} className=' bg-gray-600 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'>Cancel</button>
        </div>

      </div>



      {/* Create Staff */}
      {createStaff && (
        <div className=' z-[9999] fixed  top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm bg-white/30 transition-[all_.2s]'>
          <button onClick={() => setCreateStaff(false)}>x</button>
          <CreateStaff setStaffData={setStaffData} />
        </div>
      )}

      {/* Edit Staff */}
      {editStaff && (
        <div className='z-[9999] fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm bg-white/30'>
          <button onClick={() => setEditStaff(false)} className=" absolute bottom-9 left-36 z-[9999] bg-red-600 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
            Cancel
          </button>
          <IoMdClose className='absolute scale-[1.5] top-6 right-6 z-[99999] cursor-pointer hover:bg-gray-100 rounded-md' onClick={() => setEditStaff(false)} />
          <EditStaff id={idStaff} setStaffData={setStaffData} />
        </div>
      )}

      <div className='w-full flex items-center justify-center flex-col '>
        <div className='w-[99%] rounded-md flex items-center justify-between gap-2 mt-3  py-6 px-2 bg-slate-50 '>
          <div>
            <p className='text-[#515151] text-sm mb-2'>Quick search a staff</p>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="search" />
          </div>
          <div className='w-40 rounded-md text-center'>
            <h3 className='font-bold text-2xl'>{staffData.length}</h3>
            <p className='text-[#515151] text-sm'>Total number of staff</p>
          </div>
          <button onClick={() => setCreateStaff(!createStaff)} className='w-44 h-11  text-md flex items-center justify-center text-white bg-gradient-to-r from-[#14ADD6] to-[#384295] rounded-xl  hover:shadow-[0_0_7px_0_#384295] transition-[all_.2s]'>Add New Staff</button>
        </div>
      </div>

      <div  className='w-[99%]  z-40 sticky top-[100px] bg-slate-50 gap-[12%]  flex items-center justify-start pl-[2%] overflow-x-auto p-1 rounded-md border'>
        <p>Avatar</p>
        <p>Full Name</p>
        <p>Email</p>
        <p>Phone Number</p>
        <p>Address</p>
        <p>Gender</p>
      </div>

      {/* Staff List */}
      <div className='w-[99%] flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-md p-3 overflow-y-auto relative'>
        {staffData.length > 0 ? (
          staffData.map((data) => (
            <div key={data._id} className='w-full p-3 bg-white shadow-md border flex gap-24 items-center justify-between rounded-md overflow-x-auto '>
              <img src={`http://localhost:4000/${data.img}`} alt="" className='w-14 h-14 rounded-full' />
              <h2>{data.firstName + ' ' + data.lastName}</h2>
              <h2>{data.email}</h2>
              <h2>{data.phone}</h2>
              <h2>{data.city}</h2>
              <h2>{data.gender}</h2>

              <div className='flex items-center justify-center gap-3'>
                <MdEdit className='scale-[1.2] cursor-pointer text-gray-500' onClick={() => { setIdStaff(data._id); setEditStaff(true); }} />
                <MdDelete className='scale-[1.2] cursor-pointer text-gray-500 hover:text-red-600' onClick={() => setDeleteStaff(data._id)} />
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  )
}

export default Staff
