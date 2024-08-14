'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter()
  const [product, setProduct] = useState()

  useEffect(() => {
    document.title = 'Dashboard'

    const getProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) router.push('/register')
        
      try {
        const product = await axios.get('http://localhost:4000/staff', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProduct(product.data)
        // console.log(product.data);

      } catch (error) {
        console.log(error.response.error)
      }
    }    
    getProducts()

  }, [])

  if (!product) return <h1 className=" w-full text-center">no data</h1>


  return (
    <div>


    </div>
  );
}
