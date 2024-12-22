"use client";
import React, { useState } from 'react';
import './vehiclepage.css';

function Page() {
  const [vehicle, setVehicle] = useState({
    registerNumber: 'KL-07-1234',
    engineNumber: 'ENG123456',
    chassisNumber: 'CHS654321',
    pucc: 'Valid till 31/12/2025',
    tripHistory: [
      { date: '2024-12-15', distance: 120, purpose: 'Work commute' },
      { date: '2024-12-18', distance: 45, purpose: 'Grocery shopping' },
    ],
    fuelFillHistory: [
      { date: '2024-12-10', amount: 20 },
      { date: '2024-12-20', amount: 15 },
    ],
    mileage: 18,
    fuelCapacity: 40,
  });

  const calculateFuelRemaining = () => {
    const totalDistance = vehicle.tripHistory.reduce((acc, trip) => acc + trip.distance, 0);
    const totalFuelUsed = totalDistance / vehicle.mileage;
    return Math.max(vehicle.fuelCapacity - totalFuelUsed, 0);
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Vehicle Dashboard</h1>
      </header>
      <main className="main-content">
        <section className="vehicle-info card">
          <h2>Basic Details</h2>
          <ul>
            <li><strong>Register Number:</strong> {vehicle.registerNumber}</li>
            <li><strong>Engine Number:</strong> {vehicle.engineNumber}</li>
            <li><strong>Chassis Number:</strong> {vehicle.chassisNumber}</li>
            <li><strong>PUCC:</strong> {vehicle.pucc}</li>
          </ul>
        </section>
        <section className="trip-history card">
          <h2>Trip History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Distance (km)</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {vehicle.tripHistory.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.date}</td>
                  <td>{trip.distance}</td>
                  <td>{trip.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="fuel-history card">
          <h2>Fuel Fill History</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount (L)</th>
              </tr>
            </thead>
            <tbody>
              {vehicle.fuelFillHistory.map((fill, index) => (
                <tr key={index}>
                  <td>{fill.date}</td>
                  <td>{fill.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="mileage-info card">
          <h2>Performance</h2>
          <p><strong>Mileage:</strong> {vehicle.mileage} km/l</p>
          <p><strong>Estimated Fuel Remaining:</strong> {calculateFuelRemaining().toFixed(2)} L</p>
        </section>
      </main>
    </div>
  );
}

export default Page;
