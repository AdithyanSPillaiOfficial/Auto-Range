"use client";
import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import VehicleTile from './VehicleTile';
import Popup from '../Popup/Popup';
import Cookies from 'js-cookie';

function Dashboard() {
    const [vehicleList, setVehicleList] = useState([
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
    ]);

    const brands = [
        'Hero', 'Honda', 'Suzuki', 'Yamaha', 'Kawasaki', 'BMW', 'Harley-Davidson',
        'Ducati', 'KTM', 'TVS', 'Royal Enfield', 'Piaggio', 'Aprilia', 'Triumph',
        'Bajaj', 'Mahindra', 'Tata Motors', 'Ford', 'Chevrolet', 'Toyota', 'Hyundai',
        'Nissan', 'Volkswagen', 'Audi', 'Mercedes-Benz', 'Skoda', 'Volvo', 'Lexus',
        'Jeep', 'Land Rover', 'Jaguar', 'Porsche', 'Maserati', 'Ferrari', 'Lamborghini',
        'Bentley', 'Bugatti', 'Rolls-Royce', 'Tesla', 'Rivian', 'Lucid', 'Chery',
        'Geely', 'BYD', 'Great Wall Motors', 'Dongfeng', 'Haval', 'FAW', 'Citroën',
        'Peugeot', 'Renault', 'Mitsubishi', 'Subaru', 'Isuzu', 'Mazda', 'Opel',
        'Seat', 'Alfa Romeo', 'Saab', 'Daihatsu', 'Holden', 'Scania', 'Man',
        'Ashok Leyland', 'Eicher', 'Force Motors', 'Hino', 'Foton', 'Iveco'
    ];

    const [addvehPopup, setAddvehpopup] = useState(false);
    const [modeldropVisible, setModeldropVisible] = useState(false);

    const [searchInput, setSearchInput] = useState('');

    return (
        <div className='dashboard'>
            <div className="text-4xl font-bold">👋 Welcome {Cookies.get('name')}</div>
            <div className='titlebar'>
                <div className='heading'>Dashboard</div>
                <div className="addvehicle" onClick={() => setAddvehpopup(true)} >Add Vehicle +</div>
            </div>
            <div className="subhead">Your vehicles</div>
            <div className="vehiclelist">
                {vehicleList.map((vehicle, index) => (
                    <VehicleTile vehicle={vehicle} key={index} />
                ))}
            </div>
            <Popup isOpen={addvehPopup} closeModal={() => setAddvehpopup(false)}>
                <form action="">
                    <div className='subhead'>Add Vehicle</div>
                    <input type="text" placeholder='Reg No.' />
                    <select name="vtype" id="vtype">
                        <option value="Motor Cyle">Motor Cycle</option>
                        <option value="Motor Cycle Without Gear">Motor Cycle Without Gear</option>
                        <option value="Car">Car</option>
                        <option value="Truck">Truck</option>
                    </select>
                    {/* <div class="dropdown-container">
                        <input type="text" class="dropdown-search" placeholder="Search brands..." value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} oninput="filterDropdown()" onFocus={() => setModeldropVisible(true)} onBlur={() => setModeldropVisible(false)}/>
                            <div class="dropdown-list" id="dropdownList" hidden={!modeldropVisible}>
                                {brands.map((brand, index)=> ( <div className='dropdown-item' onClick={()=>alert(brand)}>{brand}</div> ))}
                            </div>
                    </div> */}
                    <div className="dropdown-container">
                        <input
                            type="text"
                            className="dropdown-search"
                            placeholder="Search brands..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={() => setModeldropVisible(true)}
                            onBlur={() => setTimeout(() => setModeldropVisible(false), 150)} // Delay to allow item click
                        />
                        {modeldropVisible && (
                            <div className="dropdown-list">
                                {brands.map((brand, index) => brand.toLowerCase().includes(searchInput.toLowerCase()) ? (
                                    <div
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => setSearchInput(brand)}
                                    >
                                        {brand}
                                    </div>
                                ) : null)}
                            </div>
                        )}
                    </div>
                    <input type="text" placeholder='Vehicle Model' />
                    <input type="text" placeholder='PUCC Expiry Date' />
                    <input type="submit" />
                </form>

            </Popup>
        </div>
    )
}

export default Dashboard