import React from 'react';
import "./Dashboard.css";
import { useRouter } from 'next/navigation';

function VehicleTile({vehicle}) {
  const router = useRouter();
  return (
    <div className='vehicletile' onClick={() => router.replace(`/dashboard/vehicledetails/${vehicle.regno}`)}>
        <div className='vehnum'>{vehicle.regno}</div>
        <div>{vehicle.brand} {vehicle.model}</div>
        <div>{vehicle.type}</div>
        <div>{vehicle.totalKms} KM</div>
    </div>
  )
}

export default VehicleTile