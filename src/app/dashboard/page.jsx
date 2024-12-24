"use client";
import React, { useEffect } from 'react'
import Dashboard from '../../../widgets/Dashboard/Dashboard'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  const isLogedin = Cookies.get('islogedin');
  useEffect(() => {
    if(!isLogedin) {
      router.replace("/login")
    }
  }, []);
  
  return (
    <div>
        {isLogedin ? ( <Dashboard />) : null}
    </div>
  )
}

export default page