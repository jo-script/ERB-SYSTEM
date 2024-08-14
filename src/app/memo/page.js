'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateMemo from './components/createMemo'
import GetUser from '../API/API'
import { IoMdClose } from 'react-icons/io'
import Loading from '../components/loading/loading'

function Memo() {
  const [memo, setMemo] = useState()
  const [createMemo, setCreateMemo] = useState(false)
  const [HR, setHR] = useState()


  useEffect(() => {

    const getUser = async () => {
      const data = await GetUser()
      setHR(data)
    }
    getUser()

    const token = localStorage.getItem('token')
    const getAllMemo = async () => {
      const response = await axios.get('http://localhost:4000/getMemo', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMemo(response.data)
    }


    getAllMemo()
  }, [])

  if (!memo) return <Loading />
  

  return (
    <div className='w-full'>
      {/* Create Staff */}
      {createMemo && (
        <div className=' z-[9999] fixed  top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm bg-white/30 transition-[all_.2s]'>

          <button onClick={() => setCreateMemo(false)} className=" absolute bottom-9 left-40 z-[9999] bg-red-600 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
            Cancel
          </button>
          <IoMdClose className='absolute scale-[1.5] top-6 right-6 z-[99999] cursor-pointer hover:bg-gray-100 rounded-md' onClick={() => setCreateMemo(false)} />

          <CreateMemo />
        </div>
      )}

      <div className='w-full flex items-center justify-center flex-col  '>
        <div className='w-[99%] rounded-md flex items-center justify-between gap-2 mt-3  py-6 px-2 bg-slate-50 '>
          <div>
            <p className='text-[#515151] text-sm mb-2'>Quick search a staff</p>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="search" />
          </div>
          <div className='w-40 rounded-md text-center'>
            <h3 className='font-bold text-2xl'>{memo ? memo.length : ''}</h3>
            <p className='text-[#515151] text-sm'>Total number of memo</p>
          </div>
          <button onClick={() => setCreateMemo(!createMemo)} className='w-44 h-11  text-md flex items-center justify-center text-white bg-gradient-to-r from-[#14ADD6] to-[#384295] rounded-xl  hover:shadow-[0_0_7px_0_#384295] transition-[all_.2s]'>Add New Memo</button>
        </div>
      </div>

      <div className='w-full flex items-start justify-center  pb-4 '>
        <div className='w-[99%] px-3 flex items-start justify-start gap-2 flex-wrap mt-4 '>
          {
            memo ? memo.map((data, index) => (
              <div key={index} className='w-72 h-72 shadow-md border rounded-md p-3 overflow-hidden   backdrop-blur-md bg-white/30  '>
                <div className='flex items-center gap-1'>
                  <h4 className='font-semibold'>Title :</h4>
                  <h1 className='text-[#515151] text-sm'>{data.title}</h1>
                </div>
                <div className='flex items-center gap-1'>
                  <h4 className='font-semibold'>Sent From :</h4>
                  <h1 className='text-[#515151] text-sm'>{HR ? HR.email : ''}</h1>
                </div>
                <div className='flex items-center gap-1'>
                  <h4 className='font-semibold'>Sent To :</h4>
                  <h1 className='text-[#515151] text-sm'>{data.sentTo}</h1>
                </div>
                <div className='flex items-center gap-1'>
                  <h4 className='font-semibold'>Action :</h4>
                  <h1 className='text-[#515151] text-sm'>{data.action}</h1>
                </div>
                <div className='flex items-start flex-col mt-2 gap-1'>
                  <h4 className='font-semibold'>Paragraph :</h4>
                  <h1 className='text-[#515151] text-sm'>{data.paragraph}</h1>
                </div>
              </div>
            )) : ''
          }
        </div>
      </div>
    </div>
  )
}

export default Memo
