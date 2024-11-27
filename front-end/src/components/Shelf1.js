import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from './Navbar';  // Import the Navbar
import Sidebar from './Sidebar'; // Import the Sidebar

const Shelf1 = () => {
  const product = {
    Product: "Basmati Rice",
    Total: 15,
    Image: "basmati_rice.png",
    Shelf: 1,
    packetWeight: 100,
  };

  const maxWeight = 1500; // Total maximum weight for shelf 1 (in grams)

  const [sensorWeight, setSensorWeight] = useState(0);

  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://192.168.189.137:8000/api/sensor-data'); // Adjust API URL as necessary
      if (response.ok) {
        const data = await response.json();
        setSensorWeight(data.weight);
      } else {
        console.error('Failed to fetch sensor data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateQuantity = () => {

    const packets = Math.floor(Math.max(0,sensorWeight) / product.packetWeight); // Calculate the number of packets
    return Math.min(packets, product.Total); // Ensure the quantity doesn't exceed the total capacity
  };

  const currentQuantity = calculateQuantity();
  // Calculate percentage based on weight from the sensor and max weight
  const percentage = Math.max(0, Math.min(100, Math.round((sensorWeight / maxWeight) * 100))); // Clamp percentage between 0 and 100
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10 d-flex flex-column align-items-center" style={{ marginTop: '80px' }}>
            <div className="text-center">
              <h1>Shelf 1: {product.Product}</h1>
            </div>
            <div className="row justify-content-center w-100">
              <div className="col-12 col-md-4 d-flex justify-content-center">
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
                        value={Math.min(0,percentage)}
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
