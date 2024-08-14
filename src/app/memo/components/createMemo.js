'use client'
import GetUser from '@/app/API/API'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CreateMemo() {
  const [file, setFile] = useState(null)
  const [closeForm, setCloseForm] = useState()
  const [staffData, setStaffData] = useState()
  const [HR, setHR] = useState()

  const [formData, setFormData] = useState({
    title: '',
    sentFrom: HR ? HR.email : '',
    sentTo: '',
    action: '',
    paragraph: '',
  })

  useEffect(() => {

    const getUser = async () => {
      const data = await GetUser()
      setHR(data)
    }
    getUser()


    const getAllStaff = async () => {
      const token = localStorage.getItem('token')
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value },)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const sendStaff = await axios.post('http://localhost:4000/createMemo', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setStaffData(prev => [...prev, sendStaff.data]);

    } catch (error) {
      console.log({ error: error.message });

    }
  }

  return (
    <div className={` flex flex-col items-center justify-between w-[98.5%] h-[97%] bg-white rounded-md z-20 shadow-2xl border`}>

      <form className='p-6 h-full w-full flex flex-col justify-between' onSubmit={handleSubmit}>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title Memo</label>
            <input type="text" id="title" name='title' value={formData.title} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div>
            <label for="sentFrom" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">sent From</label>
            <select id="sentFrom" name='sentFrom' value={formData.sentFrom} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected ><p className='text-gray-400'>Sent From</p></option>
              <option value={HR ? HR.email : ''}>{HR ? HR.email : ''}</option>
            </select>
          </div>
          <div>
            <label for="sentTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">sentTo</label>
            <select id="sentTo" name='sentTo' value={formData.sentTo} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected ><p className='text-gray-400'>Sent TO</p></option>
              {
                staffData ? staffData.map((data, index) => (
                  <option key={index} value={data.email}>{data.firstName + ' ' + data.lastName}</option>
                )) : ''
              }
            </select>
          </div>
          <div>
            <label for="action" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Action</label>
            {/* <input type="text" id="action" name='action' value={formData.action} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required /> */}
            <input type="text" id='action' name='action' value={formData.action} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Action" required />
          </div>
        </div>

        <div>
          <label for="paragraph" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paragraph</label>
          <textarea role='300' id="paragraph" name='paragraph' value={formData.paragraph} onChange={handleChange} class="h-56 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Paragraph" required ></textarea>
        </div>

        <div className='w-full flex items-center justify-start gap-2 '>
          <button type='submit' className=' bg-blue-600 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'>Add Memo</button>
        </div>
        {/* <button type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save And Send</button> */}
      </form>
    </div>
  )
}

export default CreateMemo
