'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CreateStaff({setStaffData}) {
  const [file, setFile] = useState(null)
  const [closeForm, setCloseForm] = useState()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    salary: '',
    workingHours: '',
    job: '',
    gender: '',
    email: '',
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFileChange = (e) => {
    setFile(e.target.files[0])    
  }

  const data = new FormData()
  data.append('image', file)

  Object.keys(formData).forEach(key => {
    data.append(key, formData[key])
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    try {
      const sendStaff = await axios.post('http://localhost:4000/createStaff', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      setStaffData(prev => [...prev, sendStaff.data]);
      // window.location.reload()

    } catch (error) {
      console.log({ error: error.message });

    }
  }

  return (
    <div className={` flex flex-col items-center justify-center w-[98.5%] h-[97%] bg-white rounded-md z-20 shadow-2xl border`}>
      <form className='p-6 w-full' onSubmit={handleSubmit}>
        <div class="flex items-center justify-center w-full mb-4">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded- cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span class="font-semibold ">Click to upload</span> or drag and drop</p>
            </div>
            <input id="dropzone-file" type="file" name='img' onChange={handleFileChange} class="hidden" />
          </label>
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" name='firstName' value={formData.firstName} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" name='lastName' value={formData.lastName} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
          </div>
          <div>
            <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <select id="city" name='city' value={formData.city} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected ><p className='text-gray-400'>City</p></option>
              <option value="Cairo">Cairo</option>
              <option value="Giza">Giza</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Dakahlia">Dakahlia</option>
              <option value="Red Sea">Red Sea</option>
              <option value="Beheira">Beheira</option>
              <option value="Fayoum">Fayoum</option>
              <option value="Gharbia">Gharbia</option>
              <option value="Ismailia">Ismailia</option>
              <option value="Monufia">Monufia</option>
              <option value="Minya">Minya</option>
              <option value="Qalyubia">Qalyubia</option>
              <option value="New Valley">New Valley</option>
              <option value="Suez">Suez</option>
              <option value="Aswan">Aswan</option>
              <option value="Assiut">Assiut</option>
              <option value="Beni Suef">Beni Suef</option>
              <option value="Port Said">Port Said</option>
              <option value="Damietta">Damietta</option>
              <option value="Sharqia">Sharqia</option>
              <option value="South Sinai">South Sinai</option>
              <option value="Kafr El Sheikh">Kafr El Sheikh</option>
              <option value="Matruh">Matruh</option>
              <option value="Luxor">Luxor</option>
              <option value="Qena">Qena</option>
              <option value="North Sinai">North Sinai</option>
              <option value="Sohag">Sohag</option>
            </select>
          </div>
          <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="number" id="phone" name='phone' value={formData.phone} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          </div>
          <div>
            <label for="salary" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
            <input type="number" id="salary" name='salary' value={formData.salary} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Salary" required />
          </div>
          <div>
            <label for="working-hours" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Working Hours</label>
            <input type="number" id="working-hours" name='workingHours' value={formData.workingHours} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          </div>
          <div>
            <label for="job" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Type </label>
            <input type="job" id="job" name='job' value={formData.job} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          </div>
          <div>
            <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender </label>
            <select id="gender" name='gender' value={formData.gender} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled selected ><p className='text-gray-400'>Gender</p></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>

    </div>
  )
}

export default CreateStaff
