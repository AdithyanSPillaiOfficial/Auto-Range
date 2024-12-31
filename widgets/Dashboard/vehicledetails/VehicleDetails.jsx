"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const VehicleDetails = ({params}) => {
  const [trips, setTrips] = useState([]);
  const [fuelFills, setFuelFills] = useState([]);
  const [isTripModalOpen, setTripModalOpen] = useState(false);
  const [isFuelModalOpen, setFuelModalOpen] = useState(false);
  const date = new Date();
  const today = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
    costPerLitre: "",
    totalCost: "",
  });

  useEffect(() => {
    fetch('/api/getvehicledetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionid: Cookies.get('sessionid'),
        regno: params.vehiclenum
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error occurred");
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status) {
          console.log(res);
          setTrips(res.vehicledetails.triphistory);
          setFuelFills(res.vehicledetails.fuelhistory);
          console.log("Trip Data")
          console.log(trips)
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [])
  

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
      let updatedFuelData = { ...prev, [name]: value };
  
      // Calculate the missing field based on the other two
      console.log(name)
      if (name === "costPerLitre" && updatedFuelData.totalCost) {
        updatedFuelData.fuelAdded = (updatedFuelData.totalCost / numericValue).toFixed(2);
        console.log(`fuel added 1 : ${updatedFuelData.fuelAdded}`);
        console.log(updatedFuelData);
      } else if (name === "fuelAdded" && updatedFuelData.totalCost) {
        updatedFuelData.costPerLitre = (updatedFuelData.totalCost / numericValue).toFixed(2);
        console.log(`cost per litre 1 : ${updatedFuelData.costPerLitre}`);
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

  const addTrip = async () => {
    const responce = await fetch('/api/addtriphistory', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        sessionid : Cookies.get('sessionid'),
        regno : params.vehiclenum,
        tripdata : tripData
      })
    });
    if(responce.ok) {
      const res = await responce.json();
      if(!res.status) {
        alert("Failed to add tripdata");
      }
    }
    else {
      alert("Error occured");
    }
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

  const addFuelFill = async () => {
    console.log(fuelData);
    const responce = await fetch('/api/addfuelhistory', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        sessionid : Cookies.get('sessionid'),
        regno : params.vehiclenum,
        fueldata : fuelData
      })
    });
    if(responce.ok) {
      const res = await responce.json();
      if(!res.status) {
        alert("Failed to add Fueldata");
      }
    }
    else {
      alert("Error occured");
    }
    setFuelFills((prev) => [...prev, fuelData]);
    setFuelData({ date: "", fuelAdded: "", costPerLitre: "", totalCost: "" });
    setFuelModalOpen(false);
  };

  const calculateTotalDistance = () => {
    return trips?.reduce((acc, trip) => acc + parseFloat(trip.distance || 0), 0);
  };

  const calculateTotalFuel = () => {
    return fuelFills?.reduce((acc, fuel) => acc + parseFloat(fuel?.fuelAdded || 0), 0);
  };

  const calculateFuelEfficiency = () => {
    const totalDistance = calculateTotalDistance();
    const totalFuel = calculateTotalFuel();
    return totalFuel > 0 ? (totalDistance / totalFuel).toFixed(2) : 0;
  };

  const calculateTotalCost = () => {
    return fuelFills?.reduce(
      (acc, fuel) => acc + parseFloat(fuel?.totalCost || 0),
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
        <p>Register Number: {params.vehiclenum}</p>
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
            {trips?.map((trip, index) => (
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
            {fuelFills?.map((fuel, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{fuel.date}</td>
                <td className="border px-4 py-2">{fuel.fuelAdded}</td>
                <td className="border px-4 py-2">₹{fuel.costPerLitre}</td>
                <td className="border px-4 py-2">₹{fuel.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modals */}
      {isTripModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={()=> setTripModalOpen(false)}>
          <div className="bg-white p-4 rounded shadow w-96" onClick={(e) => e.stopPropagation()} >
            <h3 className="text-lg font-semibold mb-2">Add Trip</h3>
            <input
              type="date"
              name="date"
              value={tripData?.date}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="text"
              name="startLocation"
              placeholder="Start Location"
              value={tripData?.startLocation}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="text"
              name="endLocation"
              placeholder="End Location"
              value={tripData?.endLocation}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="odometerStart"
              placeholder="Odometer Start"
              value={tripData?.odometerStart}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="odometerEnd"
              placeholder="Odometer End"
              value={tripData?.odometerEnd}
              onChange={handleTripChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="distance"
              placeholder="Distance"
              value={tripData?.distance}
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
              value={fuelData?.date}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="fuelAdded"
              placeholder="Fuel Added"
              value={fuelData?.fuelAdded}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="costPerLitre"
              placeholder="Cost per Liter"
              value={fuelData?.costPerLitre}
              onChange={handleFuelChange}
              className="block w-full border px-2 py-1 mb-2"
            />
            <input
              type="number"
              name="totalCost"
              placeholder="Total Cost"
              value={fuelData?.totalCost}
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

export default VehicleDetails;
