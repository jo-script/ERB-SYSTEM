'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import GetUser from '../API/API';

export default function Profile() {
  const router = useRouter()
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser =  async () => {
      setUserData(await GetUser())
    }
    getUser()
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full flex items-center justify-center text-center'>
      <h1>User Profile</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}
