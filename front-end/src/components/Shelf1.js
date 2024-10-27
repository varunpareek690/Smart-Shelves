import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from './Navbar';  // Import the Navbar
import Sidebar from './Sidebar'; // Import the Sidebar

const Shelf1 = () => {
  // Hardcoded product data for Shelf 1 (Parle G)
  const product = {
    Product: "Parle G",
    Total: 15, // Total packets that can fit on the shelf
    Image: "parle.png",
    Shelf: 1,
    packetWeight: 100, // Weight of one packet in grams
  };

  const maxWeight = 1500; // Total maximum weight for shelf 1 (in grams)

  // State to store the sensor data received from the API
  const [sensorWeight, setSensorWeight] = useState(0);

  // Fetch sensor data from API
  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/sensor-data'); // Adjust API URL as necessary
      if (response.ok) {
        const data = await response.json();
        setSensorWeight(data.weight); // Assuming the API returns the weight in grams
      } else {
        console.error('Failed to fetch sensor data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData(); // Fetch data on component mount
    const interval = setInterval(fetchSensorData, 1000); // Poll the API every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Calculate the number of packets based on the sensor weight
  const calculateQuantity = () => {
    const packets = Math.floor(sensorWeight / product.packetWeight); // Calculate the number of packets
    return Math.min(packets, product.Total); // Ensure the quantity doesn't exceed the total capacity
  };

  // Get the current quantity based on the sensor weight
  const currentQuantity = calculateQuantity();

  // Calculate percentage based on weight from the sensor and max weight
  const percentage = Math.round((sensorWeight / maxWeight) * 100);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10" style={{ marginTop: '80px' }}>
            <div className="text-center">
              <h1>Shelf 1: {product.Product}</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card h-100">
                  <img
                    src={`/images/${product.Image}`}
                    alt={product.Product}
                    className="card-img-top mx-auto"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title mb-3 text-center">{product.Product}</h5>
                    <div className="progress-container" style={{ width: '80px' }}>
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={buildStyles({
                          textColor: "black",
                          pathColor: "green",
                          trailColor: "lightgrey",
                        })}
                      />
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <p className="card-text">{`Weight: ${sensorWeight}g | Max Weight: ${maxWeight}g`}</p>
                    <p className="card-text">{`Quantity: ${currentQuantity} / ${product.Total}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shelf1;
