"use client";
// import React, { useState } from 'react';
// import './vehiclepage.css';

// function Page() {
//   const [vehicle, setVehicle] = useState({
//     registerNumber: 'KL-07-1234',
//     engineNumber: 'ENG123456',
//     chassisNumber: 'CHS654321',
//     pucc: 'Valid till 31/12/2025',
//     tripHistory: [
//       { date: '2024-12-15', distance: 120, purpose: 'Work commute' },
//       { date: '2024-12-18', distance: 45, purpose: 'Grocery shopping' },
//     ],
//     fuelFillHistory: [
//       { date: '2024-12-10', amount: 20 },
//       { date: '2024-12-20', amount: 15 },
//     ],
//     mileage: 18,
//     fuelCapacity: 40,
//   });

//   const calculateFuelRemaining = () => {
//     const totalDistance = vehicle.tripHistory.reduce((acc, trip) => acc + trip.distance, 0);
//     const totalFuelUsed = totalDistance / vehicle.mileage;
//     return Math.max(vehicle.fuelCapacity - totalFuelUsed, 0);
//   };

//   return (
//     <div className="page-container">
//       <header className="header">
//         <h1>Vehicle Dashboard</h1>
//       </header>
//       <main className="main-content">
//         <section className="vehicle-info card">
//           <h2>Basic Details</h2>
//           <ul>
//             <li><strong>Register Number:</strong> {vehicle.registerNumber}</li>
//             <li><strong>Engine Number:</strong> {vehicle.engineNumber}</li>
//             <li><strong>Chassis Number:</strong> {vehicle.chassisNumber}</li>
//             <li><strong>PUCC:</strong> {vehicle.pucc}</li>
//           </ul>
//         </section>
//         <section className="trip-history card">
//           <h2>Trip History</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Distance (km)</th>
//                 <th>Purpose</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vehicle.tripHistory.map((trip, index) => (
//                 <tr key={index}>
//                   <td>{trip.date}</td>
//                   <td>{trip.distance}</td>
//                   <td>{trip.purpose}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//         <section className="fuel-history card">
//           <h2>Fuel Fill History</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Amount (L)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vehicle.fuelFillHistory.map((fill, index) => (
//                 <tr key={index}>
//                   <td>{fill.date}</td>
//                   <td>{fill.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//         <section className="mileage-info card">
//           <h2>Performance</h2>
//           <p><strong>Mileage:</strong> {vehicle.mileage} km/l</p>
//           <p><strong>Estimated Fuel Remaining:</strong> {calculateFuelRemaining().toFixed(2)} L</p>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Page;

import React, { useState } from "react";

const Page = () => {
  const [trips, setTrips] = useState([]);
  const [fuelFills, setFuelFills] = useState([]);
  const [isTripModalOpen, setTripModalOpen] = useState(false);
  const [isFuelModalOpen, setFuelModalOpen] = useState(false);
  const date = new Date();
  const today = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [tripData, setTripData] = useState({
    date: today,
    startLocation: "",
    endLocation: "",
    odometerStart: "",
    odometerEnd: "",
    distance: "",
  });

  const [fuelData, setFuelData] = useState({
    date: today,
    fuelAdded: "",
    costPerLiter: "",
    totalCost: "",
  });

  const handleTripChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);
  
    // Update the specific field in tripData
    setTripData((prev) => {
      const updatedTripData = { ...prev, [name]: value };
  
      // Calculate distance if odometer fields are present
      if (name === "odometerEnd" || name === "odometerStart") {
        const distance = 
          updatedTripData.odometerEnd && updatedTripData.odometerStart
            ? updatedTripData.odometerEnd - updatedTripData.odometerStart
            : "";
        return { ...updatedTripData, distance };
      }
  
      return updatedTripData;
    });
  };

  const handleFuelChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0; // Convert to a number, or default to 0
  
    setFuelData((prev) => {
      let updatedFuelData = { ...prev, [name]: numericValue };
  
      // Calculate the missing field based on the other two
      console.log(name)
      if (name === "costPerLitre" && updatedFuelData.totalCost) {
        updatedFuelData.fuelAdded = (updatedFuelData.totalCost / numericValue).toFixed(2);
        console.log(`fuel added 1 : ${updatedFuelData.fuelAdded}`);
        console.log(updatedFuelData);
      } else if (name === "fuelAdded" && updatedFuelData.totalCost) {
        updatedFuelData.costPerLitre = (updatedFuelData.totalCost / numericValue).toFixed(2);
        console.log(`cost per litre 1 : ${updatedFuelData.costPerLiter}`);
        console.log(updatedFuelData);
      } else if (name === "totalCost") {
        if (updatedFuelData.costPerLitre) {
          updatedFuelData.fuelAdded = (numericValue / updatedFuelData.costPerLitre).toFixed(2);
          console.log(updatedFuelData);
        } else if (updatedFuelData.fuelAdded) {
          updatedFuelData.costPerLitre = (numericValue / updatedFuelData.fuelAdded).toFixed(2);
          console.log(updatedFuelData);
        }
      }
  
      return updatedFuelData;
    });
  };

  const addTrip = () => {
    setTrips((prev) => [...prev, tripData]);
    setTripData({
      date: "",
      startLocation: "",
      endLocation: "",
      odometerStart: "",
      odometerEnd: "",
      distance: "",
    });
    setTripModalOpen(false);
  };

  const addFuelFill = () => {
    setFuelFills((prev) => [...prev, fuelData]);
    setFuelData({ date: "", fuelAdded: "", costPerLiter: "", totalCost: "" });
    setFuelModalOpen(false);
  };

  const calculateTotalDistance = () => {
    return trips.reduce((acc, trip) => acc + parseFloat(trip.distance || 0), 0);
  };

  const calculateTotalFuel = () => {
    return fuelFills.reduce((acc, fuel) => acc + parseFloat(fuel.fuelAdded || 0), 0);
  };

  const calculateFuelEfficiency = () => {
    const totalDistance = calculateTotalDistance();
    const totalFuel = calculateTotalFuel();
    return totalFuel > 0 ? (totalDistance / totalFuel).toFixed(2) : 0;
  };

  const calculateTotalCost = () => {
    return fuelFills.reduce(
      (acc, fuel) => acc + parseFloat(fuel.totalCost || 0),
      0
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vehicle Tracker</h1>
        <nav>
          <a href="/" className="mr-4">
            Home
          </a>
          <a href="/">History</a>
        </nav>
      </header>

      {/* Vehicle Info */}
      <section className="bg-gray-100 p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold">Vehicle Information</h2>
        <p>Register Number: KL-01-AB-1234</p>
        <p>Engine Number: ABC123XYZ</p>
        <p>Chassis Number: XYZ123ABC</p>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold">Stats</h2>
        <p>Total Distance: {calculateTotalDistance()} km</p>
        <p>Total Fuel Added: {calculateTotalFuel()} liters</p>
        <p>Fuel Efficiency: {calculateFuelEfficiency()} km/l</p>
        <p>Total Fuel Cost: ₹{calculateTotalCost()}</p>
      </section>

      {/* Trip History */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Trip History</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setTripModalOpen(true)}
        >
          Add Trip
        </button>
        <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Start Location</th>
              <th className="border px-4 py-2">End Location</th>
              <th className="border px-4 py-2">Odometer Start</th>
              <th className="border px-4 py-2">Odometer End</th>
              <th className="border px-4 py-2">Distance</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{trip.date}</td>
                <td className="border px-4 py-2">{trip.startLocation}</td>
                <td className="border px-4 py-2">{trip.endLocation}</td>
                <td className="border px-4 py-2">{trip.odometerStart}</td>
                <td className="border px-4 py-2">{trip.odometerEnd}</td>
                <td className="border px-4 py-2">{trip.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Fuel Fill History */}
      <section className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Fuel Fill History</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setFuelModalOpen(true)}
        >
          Add Fuel Fill
        </button>
        <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Fuel Added</th>
              <th className="border px-4 py-2">Cost per Liter</th>
              <th className="border px-4 py-2">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {fuelFills.map((fuel, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{fuel.date}</td>
                <td className="border px-4 py-2">{fuel.fuelAdded}</td>
                <td className="border px-4 py-2">₹{fuel.costPerLiter}</td>
                <td className="border px-4 py-2">₹{fuel.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modals */}
      {isTripModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-2">Add Trip</h3>
            <input
              type="date"
              name="date"
              value={tripData.date}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="text"
              name="startLocation"
              placeholder="Start Location"
              value={tripData.startLocation}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="text"
              name="endLocation"
              placeholder="End Location"
              value={tripData.endLocation}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="odometerStart"
              placeholder="Odometer Start"
              value={tripData.odometerStart}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="odometerEnd"
              placeholder="Odometer End"
              value={tripData.odometerEnd}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="distance"
              placeholder="Distance"
              value={tripData.distance}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={addTrip}>
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setTripModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isFuelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow w-96">
            <h3 className="text-lg font-semibold mb-2">Add Fuel Fill</h3>
            <input
              type="date"
              name="date"
              value={fuelData.date}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="fuelAdded"
              placeholder="Fuel Added"
              value={fuelData.fuelAdded}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="costPerLitre"
              placeholder="Cost per Liter"
              value={fuelData.costPerLitre}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="totalCost"
              placeholder="Total Cost"
              value={fuelData.totalCost}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={addFuelFill}>
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setFuelModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
