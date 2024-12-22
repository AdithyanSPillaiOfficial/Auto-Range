import React from 'react';
import "./Dashboard.css";

function VehicleTile({vehicle}) {
  return (
    <div className='vehicletile'>
        <div className='vehnum'>{vehicle.vehicleNumber}</div>
        <div>{vehicle.brand} {vehicle.model}</div>
        <div>{vehicle.type}</div>
        <div>{vehicle.totalKms} KM</div>
    </div>
  )
}

export default VehicleTile