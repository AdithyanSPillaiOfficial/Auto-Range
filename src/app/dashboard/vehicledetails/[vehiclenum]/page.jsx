"use client";
import React, { use, useEffect } from 'react'
import VehicleDetails from '../../../../../widgets/Dashboard/vehicledetails/VehicleDetails'
import Cookies from 'js-cookie';

function page({params}) {
  params = use(params);
  const isLogedin = Cookies.get('islogedin');
  useEffect(() => {
    if(!isLogedin) {
      router.replace("/login")
    }
  }, []);
  
  return (
    <div className='w-full h-full'>
        {isLogedin ? ( <VehicleDetails params={params} />) : null}
    </div>
  )
}

export default page