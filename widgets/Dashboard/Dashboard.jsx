import React from 'react';
import "./Dashboard.css";
import VehicleTile from './VehicleTile';

function Dashboard() {
    const vehicleList = [
        {
            vehicleNumber: "KL484X5445",
            type: "Two Wheeler Without Gear",
            brand: "Honda",
            model: "Activa 6G",
            totalKms: "120",
        },
        {
            vehicleNumber: "KA245Y7689",
            type: "Car",
            brand: "Toyota",
            model: "Corolla Altis",
            totalKms: "45000",
        },
        {
            vehicleNumber: "TN12Z3476",
            type: "Two Wheeler With Gear",
            brand: "Royal Enfield",
            model: "Classic 350",
            totalKms: "16000",
        },
        {
            vehicleNumber: "MH19X9874",
            type: "Truck",
            brand: "Tata",
            model: "LPT 1613",
            totalKms: "92000",
        },
        {
            vehicleNumber: "KL07Q5634",
            type: "Bus",
            brand: "Ashok Leyland",
            model: "Comet 1613",
            totalKms: "78000",
        },
        {
            vehicleNumber: "AP09A3345",
            type: "Car",
            brand: "Maruti Suzuki",
            model: "Swift Dzire",
            totalKms: "27000",
        },
        {
            vehicleNumber: "DL3CD2345",
            type: "Three Wheeler",
            brand: "Bajaj",
            model: "RE Compact",
            totalKms: "34000",
        },
        {
            vehicleNumber: "RJ14EX1234",
            type: "Two Wheeler Without Gear",
            brand: "TVS",
            model: "Jupiter",
            totalKms: "8900",
        },
        {
            vehicleNumber: "HR26BZ7890",
            type: "Car",
            brand: "Hyundai",
            model: "Creta",
            totalKms: "38000",
        },
        {
            vehicleNumber: "GJ18HG3456",
            type: "Truck",
            brand: "Mahindra",
            model: "Blazo 31",
            totalKms: "110000",
        },
    ];

    return (
        <div className='dashboard'>
            <div className='titlebar'>
                <div className='heading'>Dashboard</div>
                <div className="addvehicle">Add Vehicle +</div>
            </div>
            <div className="subhead">Your vehicles</div>
            <div className="vehiclelist">
                {vehicleList.map((vehicle, index) => (
                    <VehicleTile vehicle={vehicle} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Dashboard