'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function EditStaff({ id, setStaffData }) {
  const [file, setFile] = useState(null)
  const [updated, setUpdated] = useState(false)

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getStaffId = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:4000/staff/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
          setFormData(response.data);

        } catch (error) {
          console.log({ error: error.message });
        }
      }
    }
    getStaffId()
  }, [id])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFileChange = (e) => setFile(e.target.files[0])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const data = new FormData()
    if (file) data.append('image', file);

    Object.keys(formData).forEach(key => data.append(key, formData[key]))

    try {
      const response = await axios.put(`http://localhost:4000/updateStaff/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })
      setUpdated(true);
      setStaffData(prevData =>
        prevData.map(staff => (staff._id === id ? response.data : staff))
      );
      setTimeout(() => setUpdated(false), 2000); // Hide the updated message after 2 seconds
      window.location.reload()

    } catch (error) {
      console.log({ error: error.message })
    }
  }

  return (
    <div className=' relative flex flex-col items-center justify-center w-[98.5%] h-[97%] bg-white rounded-md z-20 shadow-2xl border'>

      <div className={` ${updated ? 'scale-[1]' : 'scale-0'} flex items-center justify-center transition-[all_.2s] scale-0 w-60 h-60 rounded-md bg-white shadow-xl absolute `}>
        <p className='text-center'>تم التحديث بنجاح!</p>
      </div>

      <form className='p-6 w-full' onSubmit={handleSubmit}>
        <div className="flex items-center justify-center w-full mb-4">
          <label htmlFor="file" className="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <input type="file" id='file' name='img' className='hidden' onChange={handleFileChange} />
          </label>
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" name='firstName' value={formData.firstName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" name='lastName' value={formData.lastName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
          </div>
          <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <select id="city" name='city' value={formData.city} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled ><p className='text-gray-400'>Select City</p></option>
              <option value="Cairo">Cairo</option>
              <option value="Giza">Giza</option>
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
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="number" id="phone" name='phone' value={formData.phone} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" required />
          </div>
          <div>
            <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary</label>
            <input type="number" id="salary" name='salary' value={formData.salary} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Salary" required />
          </div>
          <div>
            <label htmlFor="working-hours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Working Hours</label>
            <input type="number" id="working-hours" name='workingHours' value={formData.workingHours} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Working Hours" required />
          </div>
          <div>
            <label htmlFor="job" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job</label>
            <input type="text" id="job" name='job' value={formData.job} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job" required />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
            <select id="gender" name='gender' value={formData.gender} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com" required />
          </div>
        </div>
        <button type="submit" className=" bg-blue-600 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-danger-3 transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-danger-2 focus:bg-danger-accent-300 focus:shadow-danger-2 focus:outline-none focus:ring-0 active:bg-danger-600 active:shadow-danger-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">Updated</button>
      </form>
    </div>
  )
}

export default EditStaff
