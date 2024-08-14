import axios from "axios";



export default async function GetUser() {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:4000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    console.log({ error: error.message });
  }
}


